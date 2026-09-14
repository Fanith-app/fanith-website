# Fanith production SSR deployment

## Status

The production image candidate is built, pushed and scanned. No production ECS
service, production ALB rule, CloudFront origin, or DNS record has been
changed.

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

## Planned ECS shape

The approved candidate shape is one regular Fargate task in cluster
`fanith-prod`, using `512` CPU, `1024` MiB, Linux `X86_64`, port `3001`, a
dedicated security group, and an HTTP target group health check at
`/api/health`.

Tasks must use these verified private subnets with public IP assignment
disabled:

- `subnet-039c34f53fda3c448` — private `ap-south-1a`, active NAT route
- `subnet-079b4354b406a7745` — private `ap-south-1b`, active NAT route

## Current production ALB

- ALB: `fanith-prod-alb`
- DNS: `fanith-prod-alb-441257318.ap-south-1.elb.amazonaws.com`
- HTTPS certificate: `live.fanith.com`, issued
- Existing HTTP/HTTPS default target group: `fanith-prod-gateway`
- No website host rule exists yet.

## Revalidation blocker

Secrets Manager metadata contains `fanith/prod/npc-service`, but no
unambiguous production revalidation secret reference. Do not reuse a dev or
NPC secret, invent a secret reference, or deploy a production endpoint that
silently accepts `503`. The owner must provide/approve the managed production
secret reference and confirm caller integration before production
revalidation can be claimed.

## CloudFront handoff gate

Current production distribution `E2J478Y0Q3GD2F` still uses the private S3
origin, the existing OAC, the maintenance viewer-request function, static
cache behavior, and 403/404-to-`/index.html` fallbacks. It remains unchanged.

Before any cutover, prepare a nonsecret current snapshot and exact proposed
diff covering origin protocol/TLS, Host handling, cache policies, forwarded
headers/query/cookies, error behavior, and maintenance-function behavior.
An independent reviewer must approve that diff before CloudFront or DNS is
modified. The current nonsecret rollback snapshot is
`docs/cloudfront-prod-snapshot-2026-09-14.json` with ETag
`E3R76HOPU0Z2CB`.

## Rollback

Rollback must be a reversible CloudFront origin/version change with the
pre-cutover distribution configuration retained. Do not delete the existing
S3 origin, OAC, distribution, or static deployment assets.
