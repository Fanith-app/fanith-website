import { BASE_URL } from "@/src/api/endpoint";
import {
  PLAYER_CACHE_TAG,
  SITE_URL,
  playerPath,
  type PlayerSlugRow,
} from "@/src/lib/players";

export { SITE_URL };

/**
 * URLs per chunk file. The sitemap protocol allows 50,000; 5,000 keeps each
 * file small enough to open by hand when something looks wrong in Search
 * Console, and matches the page size the /players/slugs API caps at, so one
 * chunk is exactly one upstream call.
 */
export const PLAYER_SITEMAP_CHUNK_SIZE = 5000;

function apiUrl(path: string): string {
  const raw = (BASE_URL || "").trim();
  if (!raw) return "";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  const base = withSlash.includes("/api/v1/") ? withSlash : `${withSlash}api/v1/`;
  return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
}

/** Shape of PaginatedResponse<PlayerSlugDto> from the API. */
type SlugPage = {
  data?: PlayerSlugRow[];
  meta?: { total?: number };
};

/**
 * Fetch one page of the slug feed, returning both the rows and the total the
 * API reports. `meta.total` comes back on every page, so the index route can
 * learn how many chunks exist by asking for a single row.
 */
async function fetchSlugPage(
  page: number,
  limit: number,
): Promise<{ rows: PlayerSlugRow[]; total: number }> {
  const url = apiUrl(`players/slugs?page=${page}&limit=${limit}`);
  if (!url) return { rows: [], total: 0 };

  try {
    // Tagged so a publish/unpublish purges the sitemap along with the pages —
    // a sitemap still advertising an unpublished player is the exact thing this
    // is meant to prevent.
    const res = await fetch(url, {
      next: { revalidate: 3600, tags: [PLAYER_CACHE_TAG] },
    });
    if (!res.ok) return { rows: [], total: 0 };

    const payload = (await res.json()) as SlugPage;
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    const total = Number(payload?.meta?.total ?? rows.length) || rows.length;

    return { rows, total };
  } catch {
    // A sitemap that 500s gets the whole tree dropped from Search Console.
    // An empty-but-valid sitemap is the safer failure.
    return { rows: [], total: 0 };
  }
}

export async function countPlayerSlugs(): Promise<number> {
  const { total } = await fetchSlugPage(1, 1);
  return total;
}

export async function fetchPlayerSlugChunk(
  chunk: number,
): Promise<PlayerSlugRow[]> {
  const { rows } = await fetchSlugPage(chunk + 1, PLAYER_SITEMAP_CHUNK_SIZE);
  return rows;
}

/** XML text nodes must not carry raw markup characters. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function urlsetXml(rows: PlayerSlugRow[]): string {
  const entries = rows.map((row) => {
    const loc = escapeXml(`${SITE_URL}${playerPath(row.sport, row.slug)}`);
    const lastmod = row.updatedAt
      ? new Date(row.updatedAt).toISOString()
      : undefined;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
      "    <changefreq>weekly</changefreq>",
      "    <priority>0.7</priority>",
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n");
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
