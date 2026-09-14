# GitHub Actions IAM/OIDC setup

## Provider

The existing provider is reused, not replaced or mutated:

```text
arn:aws:iam::735395976490:oidc-provider/token.actions.githubusercontent.com
audience: sts.amazonaws.com
thumbprint: ab9d0263244dd0326eb67015705a667e79cfe998
```

The trust policies use exact environment subjects, not branch wildcards:

```text
repo:Fanith-app/fanith-website:environment:dev
repo:Fanith-app/fanith-website:environment:prod
```

Any branch remains dispatchable. The production environment approval is the
critical human control because a selected branch can contain a modified
workflow.

## Roles

- `fanith-website-github-actions-dev`: applies
  `github-actions-dev-policy.json`.
- `fanith-website-github-actions-prod`: trust-only until the production ECS
  service, execution/task roles, managed revalidation secret and readiness
  review exist. Apply the production policy template only after replacing all
  placeholders with verified resource ARNs and independent review.

Both roles use a 3600-second IAM maximum session duration. The workflow asks
for a 3600-second session to cover image push, scanning and ECS stabilization.

## Permission boundaries

- ECR repository access is environment-specific; authorization-token access is
  the only ECR wildcard required by AWS.
- ECS update is limited to one selected service per environment.
- Task-definition registration is `Resource: "*"` because AWS does not expose a
  resource-level constraint for that API. Read operations use cluster/service/
  task/task-definition patterns where supported.
- `iam:PassRole` is limited to verified ECS role ARNs and requires
  `iam:PassedToService=ecs-tasks.amazonaws.com`.
- No S3, CloudFront, Route 53, Secrets Manager, ECS create/delete, or admin
  permissions are included.

Do not print, fetch, or store runtime secret values while applying these
policies. Runtime `REVALIDATE_SECRET` stays an ECS managed-secret reference.
