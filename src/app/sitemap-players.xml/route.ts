import {
  SITE_URL,
  countPlayerSitemapChunks,
  xmlResponse,
} from "@/src/lib/player-sitemap";

/**
 * Sitemap index for player pages — https://www.fanith.com/sitemap-players.xml
 *
 * ~25k players do not belong in the main sitemap. A sitemap file is capped at
 * 50,000 URLs and 50MB by the protocol, and Search Console reports are far
 * easier to read when players sit in their own tree. So this is an index, and
 * the actual URLs live in /sitemap-players/{n}.xml chunks.
 *
 * Written to out/ at build time with the rest of the static export, so it
 * lists exactly the chunks built beside it. A newly published player becomes
 * crawlable on the next deploy.
 */

export const dynamic = "force-static";

export async function GET() {
  const chunks = await countPlayerSitemapChunks();
  const lastmod = new Date().toISOString();

  const entries = Array.from({ length: chunks }, (_, i) => {
    return [
      "  <sitemap>",
      `    <loc>${SITE_URL}/sitemap-players/${i}.xml</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      "  </sitemap>",
    ].join("\n");
  });

  return xmlResponse(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      "</sitemapindex>",
    ].join("\n"),
  );
}
