import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FanPediaView from "@/src/components/fanpedia/FanPediaView";
import {
  CareerStat,
  PlayerProfile,
  SITE_URL,
  compactNumber,
  fetchAllPlayerSlugs,
  fetchPlayerBySlug,
  fetchPlayerCareerStats,
  isSportSegment,
  playerUrl,
  sportLabel,
  sportSegment,
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
 * The site is a static export served from S3 (see next.config.ts), so there is
 * no server to render a slug on its first request — a page not built here does
 * not exist. Anything outside generateStaticParams is a 404.
 */
export const dynamicParams = false;

type RouteParams = { sport: string; slug: string };

/**
 * Every player in the slug feed is prebuilt on every deploy — the same feed the
 * player sitemap lists, so every URL the sitemap advertises has a page. A
 * publish or unpublish in the admin panel shows up on the next deploy.
 *
 * An empty feed fails the build instead of shipping without player pages: the
 * deploy syncs with --delete, so a build that quietly lost the API would wipe
 * every player page off the live site.
 */
export async function generateStaticParams(): Promise<RouteParams[]> {
  const rows = await fetchAllPlayerSlugs();
  if (rows.length === 0) {
    throw new Error(
      "Player slug feed returned no players — refusing to build without player pages. Check NEXT_PUBLIC_API_URL and that the API is up.",
    );
  }
  return rows.map((row) => ({ sport: sportSegment(row.sport), slug: row.slug }));
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
