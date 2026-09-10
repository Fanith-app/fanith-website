import { BASE_URL } from "@/src/api/endpoint";

/**
 * Server-side data layer for the public player pages.
 *
 * Everything here runs on the server (the route is a Server Component), so the
 * player's name, team and stats land in the HTML Google receives rather than
 * appearing after a client-side fetch. That is the whole point of the exercise —
 * a crawler that gets an empty shell indexes an empty shell.
 */

export const SITE_URL = "https://www.fanith.com";

/**
 * Sports that own a URL prefix. The API stores the key uppercased
 * (`players.sport`); the URL uses the lowercase form.
 *
 * Adding a sport here is all it takes to open /{sport}/player/... for it —
 * anything not listed 404s rather than rendering an empty page for a crawler.
 */
export const SPORT_SEGMENTS = ["cricket", "football", "kabaddi"] as const;
export type SportSegment = (typeof SPORT_SEGMENTS)[number];

const SPORT_LABELS: Record<SportSegment, string> = {
  cricket: "Cricket",
  football: "Football",
  kabaddi: "Kabaddi",
};

export function isSportSegment(value: string): value is SportSegment {
  return (SPORT_SEGMENTS as readonly string[]).includes(value.toLowerCase());
}

export function sportLabel(segment: string): string {
  const key = segment.toLowerCase();
  return isSportSegment(key) ? SPORT_LABELS[key] : segment;
}

/** API key form (`CRICKET`) from the URL form (`cricket`). */
export function sportKey(segment: string): string {
  return segment.toUpperCase();
}

/** URL form from the API key form. */
export function sportSegment(key?: string): SportSegment {
  const lower = (key || "cricket").toLowerCase();
  return isSportSegment(lower) ? lower : "cricket";
}

/** The canonical path for a player. Single source of truth for every link. */
export function playerPath(sport: string | undefined, slug: string): string {
  return `/${sportSegment(sport)}/player/${slug}`;
}

export function playerUrl(sport: string | undefined, slug: string): string {
  return `${SITE_URL}${playerPath(sport, slug)}`;
}

// ---------------------------------------------------------------------------

export type PlayerTeamEntry = {
  teamId?: string;
  teamName?: string;
  logoUrl?: string;
  isNational?: boolean;
  isCurrent?: boolean;
  leagueName?: string;
};

export type SameNamePlayer = {
  id: string;
  fullName: string;
  slug: string;
  sport: string;
  imageUrl?: string;
  distinguisher?: string;
};

export type PlayerProfile = {
  id: string;
  slug?: string;
  sport: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  role?: string;
  imageUrl?: string;
  currentTeamName?: string;
  currentLeagueName?: string;
  primaryTeamName?: string;
  primaryTeamIsNational?: boolean;
  teams?: PlayerTeamEntry[];
  battingStyle?: string;
  bowlingStyle?: string;
  followersCount?: number;
  taggedPostCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sameNamePlayers?: SameNamePlayer[];
};

export type CareerStat = {
  matchType: string;
  seasonId?: string;
  batting?: {
    matches?: number;
    runsScored?: number;
    strikeRate?: number;
    ballsFaced?: number;
    hundreds?: number;
    fifties?: number;
    highestScore?: number;
    average?: number;
  };
  bowling?: {
    matches?: number;
    wickets?: number;
    economy?: number;
    average?: number;
  };
};

export type PlayerSlugRow = {
  slug: string;
  sport: string;
  updatedAt: string;
};

// ---------------------------------------------------------------------------

function apiBase(): string {
  const raw = (BASE_URL || "").trim();
  if (!raw) return "";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.includes("/api/v1/") ? withSlash : `${withSlash}api/v1/`;
}

function apiUrl(path: string): string {
  const base = apiBase();
  if (!base) return "";
  return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
}

/**
 * The API wraps payloads inconsistently — some routes return `{ data }`, some
 * `{ data: { data } }`. Unwrap once here so every caller sees the payload.
 */
function unwrap<T>(payload: unknown): T | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const root = payload as { data?: unknown };
  if (root.data && typeof root.data === "object") {
    const inner = root.data as { data?: unknown };
    return (inner.data ?? root.data) as T;
  }
  return payload as T;
}

/**
 * How long a player fetch stays cached. Under the static export this has no
 * effect on the live site — pages change only when a deploy rebuilds them —
 * but it becomes the ISR window again if the site moves to a Node server (see
 * next.config.ts).
 */
export const PLAYER_REVALIDATE_SECONDS = 3600;

/**
 * Cache tag on every player fetch.
 *
 * Unused while the site is a static export. On a Node server it let a single
 * on-demand purge (the /api/revalidate-player route, removed for the export)
 * drop every profile page, career-stats fetch and sitemap chunk at once when
 * an admin published or unpublished a player.
 */
export const PLAYER_CACHE_TAG = "players";

async function getJson<T>(
  path: string,
  revalidate: number,
): Promise<T | undefined> {
  const url = apiUrl(path);
  if (!url) return undefined;
  try {
    const res = await fetch(url, {
      next: { revalidate, tags: [PLAYER_CACHE_TAG] },
    });
    if (!res.ok) return undefined;
    return unwrap<T>(await res.json());
  } catch {
    // A dead API must not take the whole page down with a 500 — the route
    // turns an undefined profile into a clean 404 instead.
    return undefined;
  }
}

/**
 * Undefined here means "no page" — the player does not exist, OR their Fan
 * Pedia page is unpublished in the admin panel. The API returns 404 for both,
 * deliberately: the route turns it into notFound(), which is the signal a
 * crawler needs for a profile we do not want indexed.
 */
export async function fetchPlayerBySlug(
  sport: string,
  slug: string,
): Promise<PlayerProfile | undefined> {
  return getJson<PlayerProfile>(
    `players/by-slug/${encodeURIComponent(sportKey(sport))}/${encodeURIComponent(slug)}`,
    PLAYER_REVALIDATE_SECONDS,
  );
}

export async function fetchPlayerCareerStats(
  sport: string,
  slug: string,
): Promise<CareerStat[]> {
  const stats = await getJson<CareerStat[]>(
    `players/by-slug/${encodeURIComponent(sportKey(sport))}/${encodeURIComponent(slug)}/career-stats`,
    PLAYER_REVALIDATE_SECONDS,
  );
  return Array.isArray(stats) ? stats : [];
}

/**
 * Walk the whole slug feed for a sport, or stop early at `max`.
 *
 * The player route's generateStaticParams calls it uncapped: the site is a
 * static export, so every player it returns is prebuilt on each deploy.
 */
export async function fetchAllPlayerSlugs(
  sport?: string,
  max?: number,
): Promise<PlayerSlugRow[]> {
  const pageSize = 5000;
  const rows: PlayerSlugRow[] = [];
  const sportQuery = sport ? `&sport=${encodeURIComponent(sportKey(sport))}` : "";

  for (let page = 1; ; page += 1) {
    const path = `players/slugs?page=${page}&limit=${pageSize}${sportQuery}`;
    const batch = await getJson<PlayerSlugRow[]>(path, PLAYER_REVALIDATE_SECONDS);
    if (!batch || batch.length === 0) break;

    rows.push(...batch);
    if (max && rows.length >= max) return rows.slice(0, max);
    if (batch.length < pageSize) break;

    // Belt and braces: the API is paginated and terminates on a short page,
    // but an unbounded loop against a remote service is not worth the risk.
    if (page > 50) break;
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Presentation helpers shared by the page and its client view.

export function titleCaseEnum(value?: string): string {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

export function compactNumber(n?: number): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "-";
  return new Intl.NumberFormat("en-IN").format(n);
}

export type CareerSummary = {
  totalRuns: number;
  totalHundreds: number;
  totalFifties: number;
  totalMatches: number;
  totalBalls: number;
  totalWickets: number;
  strikeRate: number;
};

export function summarizeCareer(stats: CareerStat[]): CareerSummary {
  const summary: CareerSummary = {
    totalRuns: 0,
    totalHundreds: 0,
    totalFifties: 0,
    totalMatches: 0,
    totalBalls: 0,
    totalWickets: 0,
    strikeRate: 0,
  };

  for (const stat of stats) {
    summary.totalRuns += stat.batting?.runsScored || 0;
    summary.totalHundreds += stat.batting?.hundreds || 0;
    summary.totalFifties += stat.batting?.fifties || 0;
    summary.totalMatches += stat.batting?.matches || 0;
    summary.totalBalls += stat.batting?.ballsFaced || 0;
    summary.totalWickets += stat.bowling?.wickets || 0;
  }

  summary.strikeRate =
    summary.totalBalls > 0 ? (summary.totalRuns / summary.totalBalls) * 100 : 0;

  return summary;
}

export function runsByFormat(stats: CareerStat[]): { label: string; value: number }[] {
  const map: Record<string, number> = { ODI: 0, T20I: 0, TEST: 0, T20: 0 };
  for (const stat of stats) {
    const key = (stat.matchType || "").toUpperCase();
    if (key in map) map[key] += stat.batting?.runsScored || 0;
  }
  return Object.entries(map).map(([label, value]) => ({ label, value }));
}
