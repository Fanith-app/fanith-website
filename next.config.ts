import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes the whole site to `out/`, which the
  // deploy workflow syncs to S3 behind CloudFront. S3 only serves files, so
  // nothing here may need a running server — no ISR, no on-demand pages, no
  // POST route handlers.
  //
  // Player pages are therefore all prebuilt from the player slug feed on every
  // deploy (see [sport]/player/[slug]/page.tsx), and a publish or unpublish in
  // the admin panel reaches the site on the next deploy.
  //
  // `standalone` (what the Dockerfile expects) would bring back ISR and the
  // on-demand purge route, but only once the site runs as a Node server rather
  // than out of the S3 bucket. Switching this line alone breaks the deploy,
  // because `out/` stops being produced.
  output: "export",

  // No remote image loader is configured, and player/team art comes straight
  // from the provider CDN, so images stay unoptimized as before.
  images: { unoptimized: true },
};

export default nextConfig;
