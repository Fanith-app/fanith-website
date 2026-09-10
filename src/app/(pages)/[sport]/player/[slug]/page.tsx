import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FanPediaView from "@/src/components/fanpedia/FanPediaView";
import {
  CareerStat,
  PlayerProfile,
  SITE_URL,
  compactNumber,
  fetchPlayerBySlug,
  fetchPlayerCareerStats,
  fetchTopPlayerParams,
  isSportSegment,
  playerUrl,
  sportLabel,
  summarizeCareer,
  titleCaseEnum,
} from "@/src/lib/players";

/**
 * Per-player URL — /cricket/player/ishan-kishan.
 *
 * This renders the SAME Fan Pedia screen as /fanpedia. The only differences
 * are the ones that exist for search engines:
 *
 *   1. the player is chosen by the URL instead of defaulting to the #1 rank
 *   2. the player is fetched HERE, on the server, so their name, team and
 *      stats are in the HTML Google receives rather than arriving later from a
 *      client-side request
 *   3. the page carries its own <title>, description, canonical and Person
 *      schema
 *
 * There is deliberately no separate player layout. A visitor clicking a player
 * should see the screen they already know, at a URL that can be shared and
 * indexed.
 */

/**
 * Re-render at most hourly, in the background, per player. This is what
 * replaces the old static export for ~25k players: the first request for a
 * slug renders it, every request after that is served from cache.
 *
 * Written as a literal because Next statically analyses this export at build
 * time and rejects an imported constant. Keep it in step with
 * PLAYER_REVALIDATE_SECONDS, which governs the underlying fetch caching.
 */
export const revalidate = 3600;

/** Slugs outside generateStaticParams render on demand rather than 404. */
export const dynamicParams = true;

type RouteParams = { sport: string; slug: string };

/**
 * Only the leaderboard's top players are prebuilt. Prerendering all ~25k would
 * make every deploy render 25k pages; the rest arrive through ISR on their
 * first request, which is indistinguishable to a visitor and to a crawler.
 */
export async function generateStaticParams(): Promise<RouteParams[]> {
  return fetchTopPlayerParams(100);
}

function describe(player: PlayerProfile, stats: CareerStat[]): string {
  const team = player.primaryTeamName || player.currentTeamName;
  const role = titleCaseEnum(player.role);
  const summary = summarizeCareer(stats);

  const opening = [
    player.fullName,
    role ? `— ${role.toLowerCase()}` : "",
    team ? `for ${team}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const numbers: string[] = [];
  if (summary.totalMatches) numbers.push(`${compactNumber(summary.totalMatches)} matches`);
  if (summary.totalRuns) numbers.push(`${compactNumber(summary.totalRuns)} runs`);
  if (summary.totalWickets) numbers.push(`${compactNumber(summary.totalWickets)} wickets`);

  const stat = numbers.length ? ` Career: ${numbers.join(", ")}.` : "";
  return `${opening}. Career stats, milestones and fan activity on Fanith.${stat}`.trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { sport, slug } = await params;
  if (!isSportSegment(sport)) return { title: "Player not found | Fanith" };

  const player = await fetchPlayerBySlug(sport, slug);
  if (!player) return { title: "Player not found | Fanith" };

  const stats = await fetchPlayerCareerStats(sport, slug);
  const team = player.primaryTeamName || player.currentTeamName;
  const label = sportLabel(sport);

  // The team in the title is what separates same-named players on a search
  // results page — it is the disambiguation a searcher actually reads.
  const title = team
    ? `${player.fullName} — ${team} | ${label} Stats & Profile | Fanith`
    : `${player.fullName} — ${label} Stats & Profile | Fanith`;

  const description = describe(player, stats);
  const canonical = playerUrl(player.sport ?? sport, player.slug ?? slug);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title,
      description,
      url: canonical,
      siteName: "Fanith",
      images: player.imageUrl ? [{ url: player.imageUrl, alt: player.fullName }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: player.imageUrl ? [player.imageUrl] : undefined,
    },
  };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { sport, slug } = await params;

  // An unknown sport segment would otherwise render a shell for any top-level
  // path ending in /player/x. 404 it before doing any work.
  if (!isSportSegment(sport)) notFound();

  const player = await fetchPlayerBySlug(sport, slug);
  if (!player) notFound();

  const stats = await fetchPlayerCareerStats(sport, slug);
  const team = player.primaryTeamName || player.currentTeamName;
  const canonical = playerUrl(player.sport ?? sport, player.slug ?? slug);

  // Person schema. Search engines use it to tell same-named athletes apart —
  // the same problem the slug qualifiers solve in the URL.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.fullName,
    url: canonical,
    image: player.imageUrl || undefined,
    jobTitle: titleCaseEnum(player.role) || `${sportLabel(sport)} Player`,
    nationality: player.nationality || undefined,
    birthDate: player.dateOfBirth || undefined,
    affiliation: team ? { "@type": "SportsTeam", name: team } : undefined,
    memberOf: team ? { "@type": "SportsTeam", name: team } : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Fan Pedia", item: `${SITE_URL}/fanpedia` },
      { "@type": "ListItem", position: 2, name: player.fullName, item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <FanPediaView
        initialPlayer={{
          id: player.id,
          fullName: player.fullName,
          slug: player.slug,
          sport: player.sport,
          imageUrl: player.imageUrl,
          currentTeamName: player.currentTeamName,
          role: player.role,
          battingStyle: player.battingStyle,
          followersCount: player.followersCount,
        }}
        initialCareerStats={stats}
      />
    </>
  );
}
