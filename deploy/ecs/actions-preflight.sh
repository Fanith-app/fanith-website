#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

fail() {
  printf '::error::%s\n' "$*" >&2
  exit 1
}

command -v aws >/dev/null 2>&1 || fail 'AWS CLI is required'
command -v jq >/dev/null 2>&1 || fail 'jq is required'

runtime_dir="${RUNNER_TEMP:-${TMPDIR:-/tmp}}"
mkdir -p "$runtime_dir"

readonly EXPECTED_ACCOUNT_ID='735395976490'
readonly EXPECTED_REGION='ap-south-1'

target_env="${TARGET_ENV:-}"
[[ "$target_env" == 'dev' || "$target_env" == 'prod' ]] || fail 'TARGET_ENV must be dev or prod'

case "$target_env" in
  dev)
    expected_role_arn='arn:aws:iam::735395976490:role/fanith-website-github-actions-dev'
    expected_repository='fanith-website-dev'
    expected_cluster='fanith-dev'
    expected_service='fanith-website-dev-ssr'
    expected_family='fanith-website-dev-ssr'
    expected_container='fanith-website-dev-ssr'
    expected_execution_role='arn:aws:iam::735395976490:role/fanith-website-dev-ssr-execution-role'
    expected_task_role=''
    ;;
  prod)
    [[ "${PROD_READY:-false}" == 'true' ]] || fail 'PROD_READY is not true; production remains fail-closed'
    expected_role_arn='arn:aws:iam::735395976490:role/fanith-website-github-actions-prod'
    expected_repository='fanith-website-prod'
    expected_cluster='fanith-prod'
    expected_service='fanith-website-prod'
    expected_family='fanith-website-prod'
    expected_container='fanith-website-prod'
    expected_execution_role="${ECS_TASK_EXECUTION_ROLE_ARN:-}"
    expected_task_role="${ECS_TASK_ROLE_ARN:-}"
    [[ -n "$expected_execution_role" ]] || fail 'Production ECS execution role is not configured'
    ;;
esac

[[ "${AWS_ACCOUNT_ID:-}" == "$EXPECTED_ACCOUNT_ID" ]] || fail 'AWS account configuration is not allowlisted'
[[ "${AWS_REGION:-}" == "$EXPECTED_REGION" ]] || fail 'AWS region configuration is not allowlisted'
[[ "${AWS_ROLE_ARN:-}" == "$expected_role_arn" ]] || fail 'GitHub OIDC role configuration is not allowlisted'
[[ "${ECR_REPOSITORY:-}" == "$expected_repository" ]] || fail 'ECR repository configuration drifted'
[[ "${ECS_CLUSTER:-}" == "$expected_cluster" ]] || fail 'ECS cluster configuration drifted'
[[ "${ECS_SERVICE:-}" == "$expected_service" ]] || fail 'ECS service configuration drifted'
[[ "${ECS_TASK_FAMILY:-}" == "$expected_family" ]] || fail 'ECS task family configuration drifted'
[[ "${ECS_CONTAINER_NAME:-}" == "$expected_container" ]] || fail 'ECS container configuration drifted'
[[ "$expected_execution_role" == arn:aws:iam::${EXPECTED_ACCOUNT_ID}:role/* ]] || fail 'ECS execution role is not an account-local role'
if [[ -n "$expected_task_role" ]]; then
  [[ "$expected_task_role" == arn:aws:iam::${EXPECTED_ACCOUNT_ID}:role/* ]] || fail 'ECS task role is not an account-local role'
fi

caller_account="$(aws sts get-caller-identity --query Account --output text)"
caller_arn="$(aws sts get-caller-identity --query Arn --output text)"
[[ "$caller_account" == "$EXPECTED_ACCOUNT_ID" ]] || fail 'STS identity is in the wrong AWS account'
expected_role_name="${expected_role_arn##*/}"
case "$caller_arn" in
  arn:aws:sts::${EXPECTED_ACCOUNT_ID}:assumed-role/${expected_role_name}/*) ;;
  *) fail 'STS identity is not the selected environment OIDC role' ;;
esac

repository_arn="$(aws ecr describe-repositories \
  --repository-names "$expected_repository" \
  --query 'repositories[0].repositoryArn' \
  --output text)"
[[ "$repository_arn" == "arn:aws:ecr:${EXPECTED_REGION}:${EXPECTED_ACCOUNT_ID}:repository/${expected_repository}" ]] || fail 'ECR repository ARN drifted'
tag_mutability="$(aws ecr describe-repositories \
  --repository-names "$expected_repository" \
  --query 'repositories[0].imageTagMutability' \
  --output text)"
[[ "$tag_mutability" == 'IMMUTABLE' ]] || fail 'ECR repository tags are not immutable'
scan_on_push="$(aws ecr describe-repositories \
  --repository-names "$expected_repository" \
  --query 'repositories[0].imageScanningConfiguration.scanOnPush' \
  --output text | tr '[:upper:]' '[:lower:]')"
[[ "$scan_on_push" == 'true' ]] || fail 'ECR scan-on-push is not enabled'

cluster_arn="$(aws ecs describe-clusters \
  --clusters "$expected_cluster" \
  --query 'clusters[0].clusterArn' \
  --output text)"
cluster_status="$(aws ecs describe-clusters \
  --clusters "$expected_cluster" \
  --query 'clusters[0].status' \
  --output text)"
[[ "$cluster_arn" == "arn:aws:ecs:${EXPECTED_REGION}:${EXPECTED_ACCOUNT_ID}:cluster/${expected_cluster}" ]] || fail 'ECS cluster ARN drifted'
[[ "$cluster_status" == 'ACTIVE' ]] || fail 'ECS cluster is not ACTIVE'

service_arn="$(aws ecs describe-services \
  --cluster "$expected_cluster" \
  --services "$expected_service" \
  --query 'services[0].serviceArn' \
  --output text)"
service_status="$(aws ecs describe-services \
  --cluster "$expected_cluster" \
  --services "$expected_service" \
  --query 'services[0].status' \
  --output text)"
[[ "$service_arn" == "arn:aws:ecs:${EXPECTED_REGION}:${EXPECTED_ACCOUNT_ID}:service/${expected_cluster}/${expected_service}" ]] || fail 'ECS service is absent or ARN drifted'
[[ "$service_status" == 'ACTIVE' ]] || fail 'ECS service is not ACTIVE'

launch_type="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].launchType' --output text)"
desired_count="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].desiredCount' --output text)"
health_grace="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].healthCheckGracePeriodSeconds' --output text)"
circuit_breaker_enabled="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].deploymentConfiguration.deploymentCircuitBreaker.enable' --output text | tr '[:upper:]' '[:lower:]')"
circuit_breaker_rollback="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].deploymentConfiguration.deploymentCircuitBreaker.rollback' --output text | tr '[:upper:]' '[:lower:]')"
capacity_provider_strategy="$(aws ecs describe-services --cluster "$expected_cluster" --services "$expected_service" --query 'services[0].capacityProviderStrategy' --output json)"
[[ "$launch_type" == 'FARGATE' ]] || fail 'ECS service is not regular FARGATE'
[[ "$desired_count" == '1' ]] || fail 'ECS desired count drifted from 1'
[[ "$health_grace" == '60' ]] || fail 'ECS health-check grace period drifted from 60 seconds'
[[ "$circuit_breaker_enabled" == 'true' && "$circuit_breaker_rollback" == 'true' ]] || fail 'ECS deployment circuit breaker rollback is not enabled'
[[ "$capacity_provider_strategy" == 'null' || "$capacity_provider_strategy" == '[]' ]] || fail 'ECS capacity-provider strategy drifted from regular FARGATE'

current_task_definition="$(aws ecs describe-services \
  --cluster "$expected_cluster" \
  --services "$expected_service" \
  --query 'services[0].taskDefinition' \
  --output text)"
[[ "$current_task_definition" == "arn:aws:ecs:${EXPECTED_REGION}:${EXPECTED_ACCOUNT_ID}:task-definition/${expected_family}:"* ]] || fail 'ECS task-definition family drifted'

safe_task_definition="$runtime_dir/fanith-safe-task-definition.json"
aws ecs describe-task-definition \
  --task-definition "$current_task_definition" \
  --query 'taskDefinition.{family:family,executionRoleArn:executionRoleArn,taskRoleArn:taskRoleArn,networkMode:networkMode,requiresCompatibilities:requiresCompatibilities,cpu:cpu,memory:memory,runtimePlatform:runtimePlatform,containers:containerDefinitions[].{name:name,ports:portMappings[].containerPort,health:healthCheck}}' \
  --output json > "$safe_task_definition"

[[ "$(jq -r '.family // empty' "$safe_task_definition")" == "$expected_family" ]] || fail 'Task-definition family drifted'
[[ "$(jq -r '.executionRoleArn // empty' "$safe_task_definition")" == "$expected_execution_role" ]] || fail 'Task execution role drifted'
actual_task_role="$(jq -r '.taskRoleArn // empty' "$safe_task_definition")"
[[ "$actual_task_role" == "$expected_task_role" ]] || fail 'ECS task role drifted from the approved configuration'
[[ "$(jq -r '.networkMode // empty' "$safe_task_definition")" == 'awsvpc' ]] || fail 'Task network mode drifted'
[[ "$(jq -r '.cpu // empty' "$safe_task_definition")" == '512' && "$(jq -r '.memory // empty' "$safe_task_definition")" == '1024' ]] || fail 'Task CPU/memory drifted'
[[ "$(jq -r '.runtimePlatform.cpuArchitecture // empty' "$safe_task_definition")" == 'X86_64' ]] || fail 'Task architecture drifted'
[[ "$(jq -r '.runtimePlatform.operatingSystemFamily // empty' "$safe_task_definition")" == 'LINUX' ]] || fail 'Task operating system drifted'
[[ "$(jq -r '[.requiresCompatibilities[]? | select(. == "FARGATE")] | length' "$safe_task_definition")" == '1' ]] || fail 'Task FARGATE compatibility drifted'
[[ "$(jq --arg name "$expected_container" '[.containers[] | select(.name == $name)] | length' "$safe_task_definition")" == '1' ]] || fail 'Expected container is absent or duplicated'
[[ "$(jq --arg name "$expected_container" '[.containers[] | select(.name == $name) | .ports[]? | select(. == 3001)] | length' "$safe_task_definition")" == '1' ]] || fail 'Expected container port 3001 is absent'
health_command="$(jq -r --arg name "$expected_container" '.containers[] | select(.name == $name) | (.health.command // []) | join(" ")' "$safe_task_definition")"
[[ "$health_command" == *'127.0.0.1:3001/api/health'* ]] || fail 'Expected container health check drifted'

if [[ "$target_env" == 'prod' ]]; then
  secret_names_file="$runtime_dir/fanith-secret-names.json"
  environment_names_file="$runtime_dir/fanith-environment-names.json"
  aws ecs describe-task-definition \
    --task-definition "$current_task_definition" \
    --query 'taskDefinition.containerDefinitions[].secrets[].name' \
    --output json > "$secret_names_file"
  aws ecs describe-task-definition \
    --task-definition "$current_task_definition" \
    --query 'taskDefinition.containerDefinitions[].environment[].name' \
    --output json > "$environment_names_file"
  [[ "$(jq '[.[]? | select(. == "REVALIDATE_SECRET")] | length' "$secret_names_file")" == '1' ]] || fail 'Production task definition lacks one managed REVALIDATE_SECRET reference'
  [[ "$(jq '[.[]? | select(. == "REVALIDATE_SECRET")] | length' "$environment_names_file")" == '0' ]] || fail 'Production revalidation secret must not be plain environment text'
fi

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  printf 'current_task_definition=%s\n' "$current_task_definition" >> "$GITHUB_OUTPUT"
  printf 'cluster_arn=%s\n' "$cluster_arn" >> "$GITHUB_OUTPUT"
  printf 'service_arn=%s\n' "$service_arn" >> "$GITHUB_OUTPUT"
fi

printf 'Preflight passed: env=%s account=%s cluster=%s service=%s\n' \
  "$target_env" "$caller_account" "$expected_cluster" "$expected_service"
