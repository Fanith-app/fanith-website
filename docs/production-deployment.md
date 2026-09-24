# Fanith production SSR deployment

## Status

Production website SSR is running on ECS, and the existing website CloudFront
aliases now serve it through the production ALB. DNS names were not changed.
The old S3 origin and OAC remain configured for rollback. See
`docs/prod-live-cutover.md` for the current configuration and verification.

## Image candidate

- ECR repository: `fanith-website-prod`
- Image tag: `ssr-secure-hostfix-20260914T094005Z-working-tree`
- Image digest: `sha256:0f651f38f2830739039e524ed9bf9123b9f885752bdb65f74c40cad5b782544c`
- Platform: `linux/amd64`
- Runtime user: `nextjs`
- Docker Scout: `0C / 0H / 0M / 0L`
- ECR scan status: `COMPLETE`

This is a separate production build with:

- `NEXT_PUBLIC_API_URL=https://live.fanith.com/api/v1/`
- `NEXT_PUBLIC_DEPLOY_ENV=production`

The production smoke test returned no `X-Robots-Tag`, generated an allowing
robots policy, and passed health, home, valid player, blog, asset and 404
checks. Revalidation without a secret returned `503` and is not accepted as a
production-ready result.

## ECS shape

Service `fanith-website-prod` runs one regular Fargate task in cluster
`fanith-prod`, using `512` CPU, `1024` MiB, Linux `X86_64`, port `3001`,
security group `sg-06d49c9047eb44d46`, and the website target group with
health check at `/api/health`. The execution role is
`fanith-website-prod-ssr-execution-role`; CloudWatch log group is
`/ecs/fanith-prod/website-ssr`. The current GitHub Actions rollout uses
task definition `fanith-website-prod:2`.

Tasks use these private subnets with public IP assignment disabled:

- `subnet-039c34f53fda3c448` — private `ap-south-1a`, active NAT route
- `subnet-079b4354b406a7745` — private `ap-south-1b`, active NAT route

## Current production ALB

- ALB: `fanith-prod-alb`
- DNS: `fanith-prod-alb-441257318.ap-south-1.elb.amazonaws.com`
- HTTPS certificate: `live.fanith.com`, issued
- Existing HTTP/HTTPS default target group: `fanith-prod-gateway`
- The HTTPS listener sends requests with `Host: live.fanith.com` and
  `X-Fanith-Website-Origin: prod-ssr` to the website target group. Other
  requests retain the existing backend gateway default route.

## Revalidation blocker

The task definition injects the dedicated Secrets Manager reference
`fanith/prod/website/revalidate` as `REVALIDATE_SECRET`; the website execution
role has permission limited to reading this secret. An unauthenticated POST
through the live website returned `401`, not `503`. The `fanith-service`
publish/unpublish caller still needs the approved reference and an end-to-end
integration test. Do not print or commit the secret value.

## CloudFront handoff gate

Production distribution `E2J478Y0Q3GD2F` now uses the HTTPS ALB website
origin selected by its custom origin header, disabled HTML caching, and a
website-only maintenance function that does not rewrite clean URLs to `.html`.
The S3-origin `index.html` root and 403/404-to-200 fallbacks were removed from
the default behavior so SSR paths and real 404s work.

The nonsecret pre-cutover rollback snapshot is
`docs/cloudfront-prod-snapshot-2026-09-14.json`, ETag `E3R76HOPU0Z2CB`.
Always read the **latest** live ETag before a rollback; the snapshot ETag
cannot be reused after the cutover. DNS and the existing aliases are unchanged.

## Rollback

Rollback must be a reversible CloudFront origin/version change with the
pre-cutover distribution configuration retained. Do not delete the existing
S3 origin, OAC, distribution, or static deployment assets.
