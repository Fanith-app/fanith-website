# GitHub Actions ECS deployment

## Status

The S3/CloudFront workflow has been replaced by one manual ECS workflow. It
has no `push` or `pull_request` trigger. The dev and prod jobs have both run
successfully; production ECS and the existing website CloudFront aliases now
serve the SSR site.

Workflow file: `.github/workflows/deploy.yml`

## Branch behavior

`workflow_dispatch` exposes only `dev` and `prod` as target choices. Dev can
use any selected ref; validation rejects production unless the ref is
`refs/heads/main`. Branch names are never used in image tags.

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

The production role trusts only the GitHub OIDC subject for `main`. Production
does not use a GitHub environment or reviewer. The repository's `main` branch
is currently unprotected, so write access to main includes production deploy
authority. Review branch protection before broadening write access.

## Job and permission model

1. `validate` checks out the selected ref, runs `npm ci`, task-definition helper
   tests, strict `npm run lint`, and the selected environment build.
2. The deploy job is blocked unless validation succeeds.
3. The selected deploy job is the only job with `id-token: write`. Dev retains
   its GitHub `dev` environment; prod has no environment and uses main-only
   OIDC trust.
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
service creation/deletion, or cache invalidation. The one-time CloudFront
origin handoff was performed separately; see `docs/prod-live-cutover.md`.

## OIDC trust model

The existing AWS provider is reused without mutation:

```text
arn:aws:iam::735395976490:oidc-provider/token.actions.githubusercontent.com
audience: sts.amazonaws.com
```

The intended exact subjects are:

```text
repo:Fanith-app/fanith-website:environment:dev
repo:Fanith-app/fanith-website:ref:refs/heads/main
```

Dev uses an environment subject; prod uses an exact main-branch subject.

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
- `PROD_READY` (production is set to `true` only in the main-only job; dev
  does not use this flag)

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

Production job configuration uses the verified `fanith-prod` /
`fanith-website-prod` resources, `fanith-website-github-actions-prod` OIDC role,
and `fanith-website-prod-ssr-execution-role`. No runtime secret value is set
in GitHub variables; ECS resolves `REVALIDATE_SECRET` from Secrets Manager.

## Environment protection

`dev` is intended to be any-branch and has no production approval requirement.

The repository has a dev environment but no prod environment. The authenticated
operator does not have repository admin access; the owner selected main-only
OIDC trust for production instead of GitHub environment protection. Dev
retains the existing environment behavior.

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

The production OIDC role has permissions limited to the production website
ECR repository, selected ECS service, required ECS reads/register calls and
the website execution role for `iam:PassRole`. Its trust checks the exact
main-branch subject. Templates are under `deploy/iam/`.

## Current quality gate

The strict lint gate and production build passed in GitHub Actions run
`35953781640`; lint warnings remain non-blocking. There is no
`continue-on-error` on validation or deployment.

## Rollback and handoff

The previous task-definition ARN is captured only in the job summary. A failed
deployment must use the existing ECS circuit-breaker/previous verified revision;
the workflow does not declare rollback success merely because an old revision
exists.

CloudFront now routes the existing website aliases to the healthy ECS service.
The S3 origin remains configured for rollback and DNS was not changed.
Production `fanith-service` revalidation caller integration remains to be
verified independently.

## Latest verification

- Verified GitHub login `deepaktiwari09` has push but not admin access.
- Prod role OIDC trust is exact `main`; dev trust remains environment-scoped.
- Renderer tests: 3 passed. Production workflow run `35953781640` succeeded,
  including OIDC, smoke, image/ECR scanning, ECS rollout and digest checks.
- CloudFront distribution `E2J478Y0Q3GD2F` deployed the ECS origin and the
  existing public aliases passed SSR smoke checks. See the cutover runbook.
