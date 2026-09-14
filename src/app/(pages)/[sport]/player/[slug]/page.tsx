import { notFound, permanentRedirect } from "next/navigation";

import { isSportSegment, playerPath } from "@/src/lib/players";

type RouteParams = { sport: string; slug: string };

/**
 * Legacy player URLs remain redirectable so existing shared links and indexed
 * pages migrate to the Fan Pedia hierarchy without serving duplicate content.
 */
export default async function LegacyPlayerPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { sport, slug } = await params;

  if (!isSportSegment(sport)) {
    notFound();
  }

  permanentRedirect(playerPath(sport, slug));
}
