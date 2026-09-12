import {
  PLAYER_SITEMAP_CHUNK_SIZE,
  SITE_URL,
  countPlayerSlugs,
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
 * Served at runtime rather than written at build time so a player synced this
 * afternoon is crawlable this afternoon, without a redeploy.
 */

export const revalidate = 3600;

export async function GET() {
  const total = await countPlayerSlugs();
  const chunks = Math.max(1, Math.ceil(total / PLAYER_SITEMAP_CHUNK_SIZE));
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
