# GitHub Actions ECS deployment

## Status

The S3/CloudFront workflow has been replaced by one manual ECS workflow. The
workflow has no `push` or `pull_request` trigger and has not been triggered,
committed, or pushed by this change.

Workflow file: `.github/workflows/deploy.yml`

## Branch behavior

`workflow_dispatch` exposes only `dev` and `prod` as target choices. The
selected ref is checked out exactly as requested; no main-only or protected-
branch condition is present. Branch names are never used in image tags.

The workflow must first be committed/pushed to the default branch for GitHub's
manual-dispatch UI to expose it. Selected branches also need this workflow and
its helper files. Deployments are serialized per environment across all branches;
running deployments are not cancelled by a newer dispatch.

Image tags use:

```text
sha-<GITHUB_SHA>-run-<GITHUB_RUN_ID>-attempt-<GITHUB_RUN_ATTEMPT>
```

ECR repositories remain immutable. Each environment has its own repository and
OIDC role.

Any branch can modify a workflow before manually dispatching it. This is a
deliberate product choice, so the production environment reviewer must inspect
the selected ref, commit, workflow diff and summary before approval.

## Job and permission model

1. `validate` checks out the selected ref, runs `npm ci`, task-definition helper
   tests, strict `npm run lint`, and the selected environment build.
2. The deploy job is blocked unless validation succeeds.
3. The deploy job is bound to the selected GitHub environment and is the only
   job with `id-token: write`.
4. It builds a separate `linux/amd64` image, runs local health/SEO/route smoke
   checks, and runs pinned Trivy scanning. Scanner errors and HIGH/CRITICAL
   findings fail the job.
5. OIDC credentials are requested only after those checks and the production
   readiness guard.
6. AWS preflight verifies account, role, ECR immutability, ECS cluster/service,
   Fargate capacity, task family/container/health/capacity and deployment
   circuit-breaker settings before any push or ECS state change.
7. The renderer preserves the current task definition and changes only the
   selected container image to its immutable digest. The rendered file is
   temporary and is never uploaded as an artifact.
8. The workflow pushes the image, registers a revision, updates only the
   selected service, waits for stability, then verifies revision, task health
   and running image digest.

The workflow does not call S3, CloudFront, Route 53, Secrets Manager, ECS
service creation/deletion, or cache invalidation.

## OIDC trust model

The existing AWS provider is reused without mutation:

```text
arn:aws:iam::735395976490:oidc-provider/token.actions.githubusercontent.com
audience: sts.amazonaws.com
```

The intended exact subjects are:

```text
repo:Fanith-app/fanith-website:environment:dev
repo:Fanith-app/fanith-website:environment:prod
```

There is intentionally no branch claim. This preserves any-branch dispatch,
while environment protection remains the production control.

## Environment configuration

Variables are nonsecret GitHub environment variables only:

- `AWS_ACCOUNT_ID`
- `AWS_REGION`
- `AWS_ROLE_ARN`
- `ECR_REPOSITORY`
- `ECS_CLUSTER`
- `ECS_SERVICE`
- `ECS_TASK_FAMILY`
- `ECS_CONTAINER_NAME`
- `ECS_TASK_EXECUTION_ROLE_ARN`
- `ECS_TASK_ROLE_ARN` (only when the approved task definition has one)
- `PROD_READY` (production only; must remain `false` until readiness review)

`REVALIDATE_SECRET` must remain an ECS managed-secret reference. The workflow
never reads or prints its value. Production preflight requires exactly one
managed reference and rejects a plain environment entry.

Required dev variable values:

- `AWS_ACCOUNT_ID=735395976490`
- `AWS_REGION=ap-south-1`
- `AWS_ROLE_ARN=arn:aws:iam::735395976490:role/fanith-website-github-actions-dev`
- `ECR_REPOSITORY=fanith-website-dev`
- `ECS_CLUSTER=fanith-dev`
- `ECS_SERVICE=fanith-website-dev-ssr`
- `ECS_TASK_FAMILY=fanith-website-dev-ssr`
- `ECS_CONTAINER_NAME=fanith-website-dev-ssr`
- `ECS_TASK_EXECUTION_ROLE_ARN=arn:aws:iam::735395976490:role/fanith-website-dev-ssr-execution-role`

Production should use the corresponding `fanith-prod`/`fanith-website-prod`
values and the prod OIDC role, but must leave
`ECS_TASK_EXECUTION_ROLE_ARN` unset until that role is actually created and
reviewed. The production service/task definition is currently absent.

## Environment protection

`dev` is intended to be any-branch and has no production approval requirement.

`prod` must be any-branch but protected by a required reviewer, with
self-review disabled. The authenticated operator is not a valid sole
reviewer because that would create a self-review deadlock. Repository metadata
must be used by the repository admin to choose an eligible human reviewer.
No reviewer identity has been approved or configured yet.

The repository currently has no environments, and environment creation failed
with GitHub `403 Must have admin rights to Repository` for the authenticated
write-level operator. An administrator must create/configure both environments
without narrowing branch policy:

- `dev`: `deployment_branch_policy: null` (any branch).
- `prod`: the same any-branch policy, an approved required reviewer,
  `prevent_self_review=true`, and `PROD_READY=false`.

Until that protection is persisted, production remains fail-closed: do not
enable `PROD_READY` or grant an unprotected production path.

## IAM scope

The dev role policy is limited to:

- ECR authentication wildcard required by AWS, plus the dev repository only.
- ECS read/register operations required by the workflow.
- `ecs:UpdateService` for `fanith-dev/fanith-website-dev-ssr` only.
- `iam:PassRole` for the existing dev ECS execution role only, with
  `iam:PassedToService=ecs-tasks.amazonaws.com`.

No S3, CloudFront, DNS, Secrets Manager, ECS create/delete, or admin policy is
granted. `ecs:RegisterTaskDefinition` is resource `*` because AWS does not
provide a task-definition resource constraint for that operation; all other
supported resources stay narrowed.

The production OIDC role currently has trust only; deploy permissions remain
fail-closed while the production ECS service, execution role, managed
revalidation secret and readiness review are absent. Templates are under
`deploy/iam/`.

## Current quality gate

The latest local check reports `49 errors / 60 warnings` from `npm run lint`.
Those app issues are intentionally not changed in this scope. Consequently,
the GitHub workflow's strict lint gate currently blocks deployment; there is no
`continue-on-error` or baseline exception.

## Rollback and handoff

The previous task-definition ARN is captured only in the job summary. A failed
deployment must use the existing ECS circuit-breaker/previous verified revision;
the workflow does not declare rollback success merely because an old revision
exists.

CloudFront, DNS and existing S3 deployment assets remain unchanged. Production
deployment readiness is still separately blocked by the paused rollout review,
secure CloudFront-to-ALB origin design, and production revalidation secret and
caller integration.

## Latest verification and setup blocker

- Verified GitHub login: `deepaktiwari09`; repository push access, no admin access.
- Creating `dev` returned HTTP 403 `Must have admin rights to Repository`.
  GitHub environments/variables and the production reviewer remain unconfigured.
- Verified existing AWS OIDC provider and exact dev/prod environment trust subjects.
- Updated DEV inline IAM policy to include scoped `ecr:DescribeImageScanFindings`.
- Verified PROD role has no inline or attached permissions; it remains disabled.
- Renderer tests: 3 passed; shell syntax and `git diff --check` passed.
- Actionlint 1.7.7 passed (ShellCheck integration disabled; Bash syntax checked separately).
- AWS IAM Access Analyzer validation returned zero findings for the DEV policy.
- Action version commit pins verified through GitHub tag APIs.
- No GitHub workflow has been dispatched; end-to-end OIDC/ECS execution is untested.
- ECR scan completion alone is insufficient: HIGH/CRITICAL counts also block rollout.
