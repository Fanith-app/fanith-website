import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { PLAYER_CACHE_TAG, playerPath } from "@/src/lib/players";

/**
 * On-demand cache purge for player pages.
 *
 * Player pages are ISR with a one-hour window, which is right for content that
 * barely moves — but publishing is not content, it is a switch. Without this
 * route an admin publishes a player, opens the page, and gets the cached 404
 * from before they flipped it; and an unpublished player keeps serving their
 * old page for up to an hour after being taken down. Both read as "the button
 * is broken".
 *
 * Called by fanith-service after a Fan Pedia publish/unpublish. Authenticated
 * with a shared secret in `x-revalidate-secret`, because anyone who can call
 * this can force re-rendering.
 *
 * Body:
 *   { players: [{ sport, slug }] }  purge these pages
 *   { all: true }                   purge every player page and the sitemap —
 *                                   for bulk actions, where naming thousands of
 *                                   paths would be absurd
 */

type Body = {
  players?: { sport?: string; slug?: string }[];
  all?: boolean;
};

/** Cap on named paths per call, so one request cannot pin the server. */
const MAX_PATHS = 200;

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  // No secret configured means the feature is off, not open. Fail closed.
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, reason: "REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { revalidated: false, reason: "Body must be JSON" },
      { status: 400 },
    );
  }

  if (body.all) {
    // Every player fetch carries this tag, so one call clears the profile
    // pages, the career-stats they render and the sitemap chunks together.
    // Next 16 wants an explicit staleness profile; "max" means purge outright
    // rather than allow a stale window.
    revalidateTag(PLAYER_CACHE_TAG, "max");
    return NextResponse.json({ revalidated: true, scope: "all" });
  }

  const players = Array.isArray(body.players) ? body.players : [];
  if (players.length === 0) {
    return NextResponse.json(
      { revalidated: false, reason: "Pass `players` or `all: true`" },
      { status: 400 },
    );
  }

  const paths = players
    .filter((p): p is { sport?: string; slug: string } => Boolean(p?.slug))
    .slice(0, MAX_PATHS)
    .map((p) => playerPath(p.sport, p.slug));

  for (const path of paths) {
    revalidatePath(path);
  }

  // The sitemap chunks are what tell Google the URL exists at all, so they are
  // purged alongside the pages rather than left to age out.
  revalidatePath("/sitemap-players.xml");

  return NextResponse.json({ revalidated: true, paths });
}
