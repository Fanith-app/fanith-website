# Production website ECS handoff

## Deployment result (2026-09-24)

- GitHub Actions run `35953781640` passed production build, image and ECR
  scanning, drift preflight, service stability and running image-digest checks.
- `fanith-website-prod` runs task definition revision `:2` with one healthy
  Fargate task. The selected ALB route passed home, about and player checks.
- CloudFront distribution `E2J478Y0Q3GD2F` deployed the website ECS origin;
  current post-cutover ETag was `E1IM4EOPHS76S7`. Invalidation
  `I10ZOM5579VQ6XPQO0BIVE75VA` completed. Both existing aliases kept their
  DNS names, and the S3 origin/OAC remain configured for rollback.
- HTTP checks passed: home, about, player, sitemap and static asset returned
  `200`; an unknown route returned `404`, and unauthenticated revalidation
  returned `401`. Headless Chrome loaded home, about and a player page with no
  page errors. Do not claim publish/unpublish revalidation integration until
  `fanith-service` has been configured with the managed secret and verified.

## Website deployment

- `workflow_dispatch` on `main` selects `prod`; the validation job rejects a
  production ref other than `refs/heads/main` before requesting AWS credentials.
- The production job does not use a GitHub environment. The production OIDC role
  trusts only `repo:Fanith-app/fanith-website:ref:refs/heads/main`; the dev job
  retains its `dev` environment and separate role.
- Production build and runtime use `NEXT_PUBLIC_API_URL=https://live.fanith.com/api/v1/`.
  The renderer changes only the existing ECS container image to the new ECR
  digest and preserves the managed `REVALIDATE_SECRET` reference.
- Production has no GitHub environment reviewer. Repository `main` is not
  currently protected; people able to push there can trigger production deploys.

## Public handoff

CloudFront distribution `E2J478Y0Q3GD2F` serves `www.fanith.com` and
`fanith.com`. Keep the existing S3 origin and OAC as the rollback option.
With the distribution ETag checked against the current config, make only these
changes for the website's default behavior:

1. Add HTTPS custom origin `live.fanith.com`, with origin header
   `X-Fanith-Website-Origin: prod-ssr`. ALB listener priority 100 sends only
   requests with that header **and** `Host: live.fanith.com` to the healthy
   `fanith-website-prod-ssr` target group; all other requests retain the
   existing API gateway default action. The origin hostname matches the ALB
   certificate.
2. Set `TargetOriginId` to the new origin. Use managed CachingDisabled
   (`4135ea2d-6df8-44a3-9df3-4b5a84be39ad`) and
   AllViewerExceptHostHeader (`b689b0a8-53d0-40ab-baf2-68738e2966ac`),
   forwarding cookies and query strings to SSR without forwarding the viewer
   `Host` header. Allow GET, HEAD, OPTIONS, PUT, PATCH, POST and DELETE;
   cache only GET and HEAD.
3. Clear the S3 `index.html` default root object and the static 403/404-to-200
   fallbacks. SSR must return its real 404s.
4. Replace the website's viewer-request function with a separate maintenance-
   only function using the same KVS flag. Leave the shared function intact;
   its `.html` clean-URL rewrite breaks SSR routes.

Do not change DNS, aliases, the viewer certificate, or the shared ALB default
rule. Keep the pre-cutover nonsecret snapshot in
`docs/cloudfront-prod-snapshot-2026-09-14.json` and verify its ETag before
applying the update. After CloudFront reports Deployed, invalidate the stale
S3-backed cache and check home, a clean URL, a dynamic player page, a missing
page, static assets and the sitemap on both aliases.

## Rollback

Use the retained S3 origin to restore the original default behavior, root
object, error responses and viewer-request association if live smoke checks
fail. Apply rollback with the **latest** CloudFront ETag and invalidate changed
paths again. Do not delete the ECS service, S3 files, or the old origin.
