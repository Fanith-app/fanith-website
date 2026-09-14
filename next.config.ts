import type { NextConfig } from "next";

const isDevPreview = process.env.NEXT_PUBLIC_DEPLOY_ENV === "dev";

const nextConfig: NextConfig = {
  // Was `export`. A static export bakes every route at build time, which does
  // not survive ~25k player pages: the build would have to render all of them
  // on every deploy, and a player synced after the build would stay invisible
  // until someone triggered another one.
  //
  // `standalone` runs the Node server the existing Dockerfile already expects
  // (it copies .next/standalone and boots server.js), which unlocks ISR — a
  // player page is rendered on first request, cached, and refreshed on the
  // revalidate window declared by the route.
  output: "standalone",

  // No remote image loader is configured, and player/team art comes straight
  // from the provider CDN, so images stay unoptimized as before.
  images: { unoptimized: true },

  // Preview traffic must remain out of search indexes. This is deliberately
  // enabled only for the explicitly labelled dev deployment; production keeps
  // its existing indexing behaviour.
  async headers() {
    if (!isDevPreview) return [];

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
