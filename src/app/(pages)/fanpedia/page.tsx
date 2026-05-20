"use client";

import { BASE_URL } from "@/src/api/endpoint";
import axios from "axios";
import { Search, Shield, Users, Radio, BarChart3, Share2, ChevronRight, Heart, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

type Player = {
  id: string;
  fullName: string;
  imageUrl?: string;
  currentTeamName?: string;
  role?: string;
  battingStyle?: string;
  totalPoints?: number;
  followersCount?: number;
};

type Team = {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
  lifetimePoints?: number;
};

type Post = {
  id: string;
  author?: {
    id?: string;
    username?: string;
    fullName?: string;
    profilePhoto?: string;
    teamName?: string;
    isVerifiedPlayer?: boolean;
  };
  caption?: string;
  mediaUrl?: string;
  mediaType?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  viewCount?: number;
  createdAt?: string;
};

type CareerStat = {
  matchType: string;
  seasonId?: string;
  batting?: {
    matches?: number;
    runsScored?: number;
    strikeRate?: number;
    ballsFaced?: number;
    hundreds?: number;
    fifties?: number;
  };
};

function tokenHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function compact(n?: number) {
  if (!n && n !== 0) return "-";
  return new Intl.NumberFormat("en-IN").format(n);
}

function apiBase() {
  const raw = (BASE_URL || "").trim();
  if (!raw) return "/api/v1/";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  if (withSlash.includes("/api/v1/")) return withSlash;
  return `${withSlash}api/v1/`;
}

function apiUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${apiBase()}${cleanPath}`;
}

function isUuid(value?: string) {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function unwrap<T = unknown>(payload: unknown): T | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const root = payload as { data?: unknown };
  if (root.data && typeof root.data === "object") {
    const inner = root.data as { data?: unknown };
    return (inner.data ?? root.data) as T;
  }
  return payload as T;
}

function timeAgo(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Math.max(0, Date.now() - d.getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function postPreviewText(post: Post) {
  const caption = (post.caption || "").trim();
  if (caption) return caption;
  const media = (post.mediaType || "").toUpperCase();
  const author = post.author?.fullName || post.author?.username || "User";
  if (media) return `${author} shared a ${media.toLowerCase()} post`;
  return `${author} shared a post`;
}

function Skel({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/10 ${className}`} />;
}

export default function FanPediaPage() {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [topTeams, setTopTeams] = useState<Team[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [careerStats, setCareerStats] = useState<CareerStat[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingPlayerStats, setLoadingPlayerStats] = useState(false);
  const [hoveredRunLabel, setHoveredRunLabel] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const headers = tokenHeaders();
      setLoadingOverview(true);
      const playersPromise = axios.get(apiUrl("players/leaderboard?page=1&limit=5&sortBy=totalPoints"), { headers }).catch(() => null);
      const teamsPromise = axios.get(apiUrl("stats/teams/leaderboard?page=1&limit=3")).catch(() => null);
      const postsPromise = axios.get(apiUrl("posts/public/feed?feedType=TRENDING&page=1&limit=2&hasMentions=true")).catch(() => null);
      const [playersRes, teamsRes, postsRes] = await Promise.all([playersPromise, teamsPromise, postsPromise]);

      const playersData = unwrap<Player[]>(playersRes) || [];
      if (Array.isArray(playersData) && playersData.length) {
        const rankedPlayers = [...playersData].sort((a, b) => {
          const aPoints = Number(a?.totalPoints ?? 0);
          const bPoints = Number(b?.totalPoints ?? 0);
          if (bPoints !== aPoints) return bPoints - aPoints;
          return Number(a?.rank ?? Number.MAX_SAFE_INTEGER) - Number(b?.rank ?? Number.MAX_SAFE_INTEGER);
        });
        setTopPlayers(rankedPlayers);
        setSelectedPlayer(rankedPlayers[0]);
      }

      const teamsRoot = unwrap<{ teams?: Team[] }>(teamsRes);
      const teamsData = teamsRoot?.teams || [];
      if (Array.isArray(teamsData) && teamsData.length) setTopTeams(teamsData);

      const postsData = unwrap<Post[]>(postsRes) || [];
      if (Array.isArray(postsData) && postsData.length) setTrendingPosts(postsData);
      setLoadingOverview(false);
    };
    load();
  }, []);

  useEffect(() => {
    const loadPlayer = async () => {
      if (selectedPost) return;
      if (!selectedPlayer?.id || !isUuid(selectedPlayer.id)) return;
      setLoadingPlayerStats(true);
      const headers = tokenHeaders();
      const [profileRes, careerRes] = await Promise.all([
        axios.get(apiUrl(`players/${selectedPlayer.id}`), { headers }).catch(() => null),
        axios.get(apiUrl(`players/${selectedPlayer.id}/career-stats`), { headers }).catch(() => null),
      ]);

      const profileData = unwrap<Partial<Player>>(profileRes);
      const statsData = unwrap<CareerStat[]>(careerRes);
      if (profileData && typeof profileData === "object") {
        setSelectedPlayer((prev) => ({ ...prev, ...profileData }));
      }
      if (Array.isArray(statsData)) setCareerStats(statsData);
      setLoadingPlayerStats(false);
    };
    loadPlayer();
  }, [selectedPlayer?.id, selectedPost]);

  const runsByFormat = useMemo(() => {
    const map: Record<string, number> = { ODI: 0, T20I: 0, TEST: 0, T20: 0 };
    for (const s of careerStats) {
      const key = (s.matchType || "").toUpperCase();
      if (key === "ODI") map.ODI += s.batting?.runsScored || 0;
      if (key === "T20I") map.T20I += s.batting?.runsScored || 0;
      if (key === "TEST") map.TEST += s.batting?.runsScored || 0;
      if (key === "T20") map.T20 += s.batting?.runsScored || 0;
    }
    return Object.entries(map).map(([label, value]) => ({ label, value }));
  }, [careerStats]);

  const runsAxis = useMemo(() => {
    const maxValue = Math.max(0, ...runsByFormat.map((r) => r.value));
    const step = 2000;
    const maxTick = Math.max(step, Math.ceil(maxValue / step) * step);
    const ticks = Array.from({ length: Math.floor(maxTick / step) + 1 }, (_, i) => i * step);
    return { maxTick, ticks };
  }, [runsByFormat]);

  const milestone = useMemo(() => {
    let hundreds = 0;
    let fifties = 0;
    for (const s of careerStats) {
      hundreds += s.batting?.hundreds || 0;
      fifties += s.batting?.fifties || 0;
    }
    const total = hundreds + fifties;
    return { total, hundreds, fifties };
  }, [careerStats]);

  const milestoneData = useMemo(
    () => [
      { name: "100s", value: milestone.hundreds, color: "#FFAE34" },
      { name: "50s", value: milestone.fifties, color: "#3FA0E1" },
    ],
    [milestone],
  );

  const summary = useMemo(() => {
    let totalRuns = 0;
    let totalHundreds = 0;
    let totalMatches = 0;
    let totalBalls = 0;
    for (const s of careerStats) {
      totalRuns += s.batting?.runsScored || 0;
      totalHundreds += s.batting?.hundreds || 0;
      totalMatches += s.batting?.matches || 0;
      totalBalls += s.batting?.ballsFaced || 0;
    }
    const strikeRate = totalBalls > 0 ? (totalRuns / totalBalls) * 100 : 0;
    return { totalRuns, totalHundreds, totalMatches, strikeRate };
  }, [careerStats]);

  return (
    <main className="relative min-h-screen pt-24 pb-8 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/images/fanpedia-page/fanpedia-bg.jpg"
          alt="Fan Pedia Stadium Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(221,35,35,0.28),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(40,90,255,0.14),transparent_35%)]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="w-full px-4">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090B10]/65 p-3 md:p-5">

          <div className="relative grid gap-4 lg:grid-cols-[280px_1fr_280px]">
            <aside className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
              <div className="mb-5 rounded-md bg-white/5 px-3 py-1 text-[10px]">FAN PEDIA</div>
              <h1 className="text-5xl font-bold leading-[0.95]">
                Explore.
                <br />
                Analyze.
                <br />
                Celebrate
                <br />
                <span className="text-[#E6252A]">Fandom.</span>
              </h1>
              <p className="mt-4 text-xs text-white/65">Dive into player, team, league and tribe stats.</p>
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs text-white/60">
                <Search className="h-3.5 w-3.5" /> Search for players, teams, leagues...
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] text-white/70">
                <div><BarChart3 className="mb-1 h-3.5 w-3.5" /> In-depth Stats</div>
                <div><Shield className="mb-1 h-3.5 w-3.5" /> Fan Driven Content</div>
                <div><Users className="mb-1 h-3.5 w-3.5" /> Tribe Rankings</div>
                <div><Radio className="mb-1 h-3.5 w-3.5" /> Live Updates</div>
              </div>
            </aside>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                {selectedPost ? (
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
                        {selectedPost.author?.profilePhoto ? (
                          <Image src={selectedPost.author.profilePhoto} alt={selectedPost.author.fullName || selectedPost.author.username || "Author"} width={40} height={40} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-white/10" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{selectedPost.author?.fullName || selectedPost.author?.username || "Unknown user"}</p>
                        <p className="text-[11px] text-white/60">{selectedPost.author?.teamName || selectedPost.author?.username || "-"} {selectedPost.createdAt ? `• ${timeAgo(selectedPost.createdAt)}` : ""}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      {selectedPost.mediaUrl ? (
                        selectedPost.mediaType?.toUpperCase() === "VIDEO" ? (
                          <video src={selectedPost.mediaUrl} controls className="h-[310px] w-full rounded-lg bg-black object-cover" />
                        ) : (
                          <Image src={selectedPost.mediaUrl} alt={selectedPost.caption || "Trending post media"} width={960} height={540} className="h-[310px] w-full rounded-lg object-cover" />
                        )
                      ) : (
                        <div className="flex min-h-[180px] items-center rounded-lg bg-black/35 p-4">
                          <p className="text-sm text-white/90">{selectedPost.caption || "No caption available"}</p>
                        </div>
                      )}
                    </div>
                    {selectedPost.caption ? <p className="mt-3 line-clamp-3 text-sm text-white/85">{selectedPost.caption}</p> : null}
                    <div className="mt-3 grid grid-cols-4 gap-2 rounded-lg bg-black/50 p-3 text-center">
                      <div><p className="flex items-center justify-center gap-1 text-sm font-semibold"><Heart className="h-4 w-4" /> {compact(selectedPost.likeCount || 0)}</p><p className="text-[10px] text-white/50">LIKES</p></div>
                      <div><p className="flex items-center justify-center gap-1 text-sm font-semibold"><MessageCircle className="h-4 w-4" /> {compact(selectedPost.commentCount || 0)}</p><p className="text-[10px] text-white/50">COMMENTS</p></div>
                      <div><p className="flex items-center justify-center gap-1 text-sm font-semibold"><Share2 className="h-4 w-4" /> {compact(selectedPost.shareCount || 0)}</p><p className="text-[10px] text-white/50">SHARES</p></div>
                      <div><p className="flex items-center justify-center gap-1 text-sm font-semibold"><Eye className="h-4 w-4" /> {compact(selectedPost.viewCount || 0)}</p><p className="text-[10px] text-white/50">VIEWS</p></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-end gap-3">
                      {loadingOverview ? (
                        <Skel className="h-14 w-14 rounded-md" />
                      ) : (
                        <Image src={selectedPlayer?.imageUrl || "/assets/images/fan-img1.png"} alt={selectedPlayer?.fullName || "Player"} width={80} height={80} className="h-20 w-20 rounded-md border border-[#E6252A] object-cover" />
                      )}
                      <div className="flex-1">
                        {loadingOverview ? (
                          <>
                            <Skel className="h-8 w-56" />
                            <Skel className="mt-2 h-4 w-44" />
                            <div className="mt-2 flex gap-2">
                              <Skel className="h-6 w-16" />
                              <Skel className="h-6 w-24" />
                            </div>
                          </>
                        ) : (
                          <>
                            <h2 className="text-3xl font-semibold leading-none">{selectedPlayer?.fullName || "-"}</h2>
                            <p className="mt-1 text-xs text-white/70">{selectedPlayer?.currentTeamName || "-"}</p>
                            <div className="mt-2 flex gap-2 text-[10px] text-white/65">
                              <span className="rounded bg-white/10 px-2 py-1">{(selectedPlayer?.role || "-").replaceAll("_", " ")}</span>
                              <span className="rounded bg-white/10 px-2 py-1">{(selectedPlayer?.battingStyle || "-").replaceAll("_", " ")}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 rounded-lg bg-black/50 p-3 text-center">
                      {loadingPlayerStats || loadingOverview ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={`stat-skel-${i}`}>
                            <Skel className="mx-auto h-7 w-16" />
                            <Skel className="mx-auto mt-2 h-3 w-10" />
                          </div>
                        ))
                      ) : (
                        <>
                          <div><p className="text-2xl font-semibold">{compact(summary.totalRuns)}</p><p className="text-[10px] text-white/50">RUNS</p></div>
                          <div><p className="text-2xl font-semibold">{compact(summary.totalHundreds)}</p><p className="text-[10px] text-white/50">100s</p></div>
                          <div><p className="text-2xl font-semibold">{compact(summary.totalMatches)}</p><p className="text-[10px] text-white/50">MATCHES</p></div>
                          <div><p className="text-2xl font-semibold">{summary.strikeRate ? summary.strikeRate.toFixed(2) : "-"}</p><p className="text-[10px] text-white/50">STRIKE RATE</p></div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                  <div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold">Runs Breakdown</h3></div>
                  <div className="rounded-md bg-black/40 p-3">
                    {loadingPlayerStats || loadingOverview ? (
                      <div className="flex h-52 items-end justify-around gap-3">
                        {["h-24", "h-14", "h-16", "h-28"].map((h, i) => (
                          <div key={`run-skel-${i}`} className="flex flex-col items-center gap-2">
                            <Skel className={`${h} w-7 rounded-sm`} />
                            <Skel className="h-3 w-8" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative grid h-56 grid-cols-[56px_1fr] gap-2">
                        <div className="relative h-44">
                          {runsAxis.ticks.map((tick) => (
                            <div
                              key={`ylabel-${tick}`}
                              className="absolute left-0 text-[10px] text-white/45"
                              style={{
                                top: `${((runsAxis.maxTick - tick) / runsAxis.maxTick) * 100}%`,
                                transform: "translateY(-50%)",
                              }}
                            >
                              {compact(tick)}
                            </div>
                          ))}
                        </div>
                        <div className="relative h-44">
                          {runsAxis.ticks.map((tick) => (
                            <div
                              key={`grid-${tick}`}
                              className="absolute left-0 right-0 border-t border-white/10"
                              style={{ top: `${((runsAxis.maxTick - tick) / runsAxis.maxTick) * 100}%` }}
                            />
                          ))}
                          <div className="absolute bottom-0 left-0 right-0 flex h-full items-end justify-around">
                            {runsByFormat.map((bar, i) => {
                              const valueHeight = Math.max(8, (bar.value / Math.max(1, runsAxis.maxTick)) * 100);
                              const isHovered = hoveredRunLabel === bar.label;
                              const dimOthers = hoveredRunLabel !== null && !isHovered;
                              return (
                                <div
                                  key={`${selectedPlayer?.id || "player"}-${bar.label}`}
                                  className="relative flex h-full w-12 flex-col items-center justify-end"
                                  onMouseEnter={() => setHoveredRunLabel(bar.label)}
                                  onMouseLeave={() => setHoveredRunLabel(null)}
                                >
                                  {isHovered ? (
                                    <div
                                      className="absolute z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[#0D111A]/95 px-2 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur"
                                      style={{
                                        left: "50%",
                                        bottom: `calc(${valueHeight}% + 8px)`,
                                      }}
                                    >
                                      {compact(bar.value)}
                                    </div>
                                  ) : null}
                                  <div
                                    className={`w-8 rounded-t-lg transition-[height,opacity,filter] duration-500 ease-out ${dimOthers ? "opacity-25" : "opacity-100"} ${isHovered ? "brightness-110" : ""}`}
                                    style={{
                                      height: `${valueHeight}%`,
                                      background: ["#F9A03F", "#5A9DED", "#2FD1AF", "#3B87DB"][i % 4],
                                    }}
                                  />
                                  <span className="mt-2 text-[10px] text-white/70">{bar.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                  <h3 className="mb-2 text-sm font-semibold">Milestones</h3>
                  {loadingPlayerStats || loadingOverview ? (
                    <div className="mx-auto mt-3 flex h-28 w-56 items-center justify-center rounded-t-full border-x-8 border-t-8 border-white/10">
                      <Skel className="h-8 w-14" />
                    </div>
                  ) : (
                    <div className="mx-auto mt-2 w-full">
                      <div className="relative mx-auto h-44 w-72" onMouseDown={(e) => e.preventDefault()}>
                        <PieChart width={288} height={176} style={{ outline: "none" }}>
                          <Pie
                            data={[{ value: 1 }]}
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="100%"
                            innerRadius={96}
                            outerRadius={126}
                            stroke="none"
                            fill="rgba(255,255,255,0.08)"
                            isAnimationActive={false}
                            rootTabIndex={-1}
                          />
                          <Pie
                            data={milestoneData}
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="100%"
                            innerRadius={96}
                            outerRadius={126}
                            stroke="none"
                            cornerRadius={2}
                            isAnimationActive
                            animationDuration={500}
                            rootTabIndex={-1}
                          >
                            {milestoneData.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                        <style jsx>{`
                          :global(.recharts-sector:focus),
                          :global(.recharts-sector:focus-visible),
                          :global(.recharts-wrapper:focus),
                          :global(.recharts-wrapper:focus-visible),
                          :global(svg:focus),
                          :global(svg:focus-visible) {
                            outline: none !important;
                          }
                        `}</style>
                        <div className="absolute inset-x-0 top-[78px] text-center">
                          <p className="text-3xl font-semibold">{milestone.total}</p>
                          <p className="text-[10px] text-white/60">TOTAL MILESTONES</p>
                        </div>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] text-white/85">
                        <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#FFAE34]" />100s <span className="text-[10px] text-white/55">({milestone.hundreds})</span></span>
                        <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#3FA0E1]" />50s <span className="text-[10px] text-white/55">({milestone.fifties})</span></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/45 p-4 text-sm backdrop-blur-lg">
                <div className="flex items-center gap-2"><Share2 className="h-4 w-4 text-[#E6252A]" /> Share the stats. Show your pride.</div>
                <span className="text-xs text-[#E6252A]">#PeakOfFandom</span>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Top Players (Fanith Points)</h3><span className="text-xs text-[#3E8BFF]">View All</span></div>
                <div className="space-y-2">
                  {loadingOverview ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={`p-skel-${i}`} className="rounded-lg bg-white/5 p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Skel className="h-4 w-3" />
                            <Skel className="h-7 w-7 rounded-full" />
                            <div>
                              <Skel className="h-3 w-24" />
                              <Skel className="mt-1 h-3 w-16" />
                            </div>
                          </div>
                          <Skel className="h-4 w-12" />
                        </div>
                      </div>
                    ))
                  ) : topPlayers.slice(0, 5).map((p, i) => (
                    <button key={p.id} className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white/5 p-2 text-left" onClick={() => { setSelectedPost(null); setSelectedPlayer((prev) => ({ ...(prev ?? {}), ...p } as Player)); }}>
                      <div className="flex items-center gap-2"><span className="w-4 text-xs text-white/60">{i + 1}</span><div className="h-7 w-7 overflow-hidden rounded-full bg-white/10">{p.imageUrl && <Image src={p.imageUrl} alt={p.fullName} width={28} height={28} className="h-full w-full object-cover" />}</div><div><p className="text-xs">{p.fullName}</p><p className="text-[10px] text-white/55">{p.currentTeamName || "-"}</p></div></div>
                      <p className="text-xs font-semibold">{compact(p.totalPoints)}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Top Tribes (This Season)</h3><span className="text-xs text-[#3E8BFF]">View All</span></div>
                <div className="space-y-2">
                  {loadingOverview ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={`t-skel-${i}`} className="rounded-lg bg-white/5 p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Skel className="h-4 w-3" />
                            <Skel className="h-7 w-7 rounded-full" />
                            <Skel className="h-3 w-24" />
                          </div>
                          <Skel className="h-4 w-14" />
                        </div>
                      </div>
                    ))
                  ) : topTeams.slice(0, 3).map((t, i) => (
                    <div key={t.id} className="flex cursor-pointer items-center justify-between rounded-lg bg-white/5 p-2">
                      <div className="flex items-center gap-2"><span className="w-4 text-xs text-white/60">{i + 1}</span><div className="h-7 w-7 overflow-hidden rounded-full bg-white/10">{t.logoUrl && <Image src={t.logoUrl} alt={t.name} width={28} height={28} className="h-full w-full object-cover" />}</div><div><p className="text-xs">{t.name}</p></div></div>
                      <p className="text-xs font-semibold">{compact(t.lifetimePoints)} <span className="text-[10px] text-white/60">Pts</span></p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-lg">
                <h3 className="mb-3 text-sm font-semibold">Trending in Fan Pedia</h3>
                <div className="space-y-2">
                  {loadingOverview ? (
                    Array.from({ length: 2 }).map((_, i) => (
                      <div key={`post-skel-${i}`} className="rounded-lg bg-white/5 p-2">
                        <Skel className="h-3 w-40" />
                        <Skel className="mt-1 h-3 w-28" />
                        <Skel className="mt-2 h-3 w-20" />
                      </div>
                    ))
                  ) : trendingPosts.slice(0, 2).map((post) => (
                    <button key={post.id} type="button" onClick={() => setSelectedPost(post)} className="flex w-full cursor-pointer items-start justify-between gap-2 rounded-lg bg-white/5 p-2 text-left">
                      <div>
                        <p className="line-clamp-2 text-xs">{postPreviewText(post)}</p>
                        <p className="mt-1 text-[10px] text-white/50">{timeAgo(post.createdAt)} • {compact(post.viewCount)} views</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/60" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
