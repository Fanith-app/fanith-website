import { notFound } from "next/navigation";
import {
  fetchPlayerSlugChunk,
  urlsetXml,
  xmlResponse,
} from "@/src/lib/player-sitemap";

/**
 * One chunk of player URLs — /sitemap-players/0.xml, /1.xml, ...
 *
 * Listed by /sitemap-players.xml. Split rather than served as one file because
 * ~25k URLs in a single sitemap is unwieldy to inspect, and the protocol caps a
 * file at 50,000 anyway.
 */

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chunk: string }> },
) {
  const { chunk } = await params;

  // The segment carries the extension (`0.xml`) so the URL looks like a
  // sitemap to a crawler; strip it before parsing the index.
  const index = Number(chunk.replace(/\.xml$/i, ""));
  if (!Number.isInteger(index) || index < 0) notFound();

  const rows = await fetchPlayerSlugChunk(index);
  return xmlResponse(urlsetXml(rows));
}
