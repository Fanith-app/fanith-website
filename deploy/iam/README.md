# GitHub Actions IAM/OIDC setup

## Provider

The existing provider is reused, not replaced or mutated:

```text
arn:aws:iam::735395976490:oidc-provider/token.actions.githubusercontent.com
audience: sts.amazonaws.com
thumbprint: ab9d0263244dd0326eb67015705a667e79cfe998
```

The trust policies use exact subjects, not branch wildcards:

```text
repo:Fanith-app/fanith-website:environment:dev
repo:Fanith-app/fanith-website:ref:refs/heads/main
```

Dev can dispatch any branch; production can dispatch only `main`. The
production job has no GitHub environment approval, and `main` is currently
unprotected. Restrict write access accordingly.

## Roles

- `fanith-website-github-actions-dev`: applies
  `github-actions-dev-policy.json`.
- `fanith-website-github-actions-prod`: trusts the exact `main` ref and has a
  policy limited to the production website repository/service and execution
  role. Replace all production policy template placeholders with verified
  resource ARNs before reapplying it.

Both roles use a 3600-second IAM maximum session duration. The workflow asks
for a 3600-second session to cover image push, scanning and ECS stabilization.

## Permission boundaries

- ECR repository access is environment-specific; authorization-token access is
  the only ECR wildcard required by AWS.
- ECS update is limited to one selected service per environment.
- Task-definition registration and `ecs:DescribeTaskDefinition` require
  `Resource: "*"`; AWS evaluates both calls there. `ecs:ListTasks` needs the
  selected cluster's container-instance ARN pattern. Other reads use
  cluster/service/task patterns where supported.
- `iam:PassRole` is limited to verified ECS role ARNs and requires
  `iam:PassedToService=ecs-tasks.amazonaws.com`.
- No S3, CloudFront, Route 53, Secrets Manager, ECS create/delete, or admin
  permissions are included.

Do not print, fetch, or store runtime secret values while applying these
policies. Runtime `REVALIDATE_SECRET` stays an ECS managed-secret reference.
