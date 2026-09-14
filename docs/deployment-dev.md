# Fanith dev SSR deployment

## Status

The isolated ECS candidate is deployed and healthy. It is not publicly routed
yet. The existing `dev-site.fanith.com` CloudFront/S3 site is unchanged.

## Candidate

- Cluster: `fanith-dev`
- Service: `fanith-website-dev-ssr`
- Task definition: `fanith-website-dev-ssr:5`
- Launch type: regular Fargate, `512` CPU, `1024` MiB, Linux `X86_64`
- Container port: `3001`
- Health endpoint: `/api/health`
- Image tag: `ssr-secure-hostfix-20260914T092441Z-working-tree`
- Image digest: `sha256:bd5d82a01f7ae1c0eebbc0b4a6746c4592951ddfd4337f7f2e61f2af5a09b80a`

Runtime environment is explicitly configured for the dev API:

- `NEXT_PUBLIC_API_URL=https://dev.fanith.com/api/v1/`
- `NEXT_PUBLIC_DEPLOY_ENV=dev`
- `NEXT_TELEMETRY_DISABLED=1`

## Network

- Dedicated task security group: `sg-02e4c863e6aa3c9cf`
- Container ingress: TCP `3001` from ALB security group
  `sg-0cf29150a6b132a47` only
- Target group: `fanith-website-dev-ssr`
- Target group health path: `/api/health`
- Target group is currently not attached to a listener.
- Service has no load balancer attachment until hostname/certificate routing is
  approved.

## SEO and revalidation

Dev builds emit `X-Robots-Tag: noindex, nofollow, noarchive` and generate a
robots policy that disallows crawling. The revalidation endpoint remains
fail-closed with HTTP `503` when no secret is supplied; this is accepted for
the dev candidate only.

## Verification

- ECS rollout completed with desired `1`, running `1`, pending `0`.
- Running task/container health: `HEALTHY`.
- Local container smoke tests passed for health, home, blog, player, asset and
  negative-route responses.
- Docker Scout: `0C / 0H / 0M / 0L`.

## Routing gate

The shared dev ALB certificate covers `dev.fanith.com` only, not
`dev-site.fanith.com`. Its existing HTTP/HTTPS listeners default to the
`fanith-dev-gateway` target group. Do not add a host rule, change listeners,
or change DNS until the owner confirms the hostname and certificate plan.

## Rollback

Rollback means updating only this service to an explicitly selected,
previously verified task-definition revision. Do not delete the service,
target group, ECR images, log group, or task-definition revisions without
separate approval.
