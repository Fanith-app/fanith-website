import type { Metadata } from "next";
import FanPediaView from "@/src/components/fanpedia/FanPediaView";

/**
 * Fan Pedia hub — /fanpedia.
 *
 * The screen itself lives in FanPediaView, shared with the per-player URLs
 * (/cricket/player/ishan-kishan). Here it runs with no preselected player, so
 * it falls back to the #1 ranked player exactly as it always has.
 */

export const metadata: Metadata = {
  title: "Fan Pedia — Cricket Player & Team Stats | Fanith",
  description:
    "Explore player, team, league and tribe stats on Fanith Fan Pedia. Career numbers, milestones, leaderboards and trending fan posts.",
  alternates: { canonical: "https://www.fanith.com/fanpedia" },
};

export default function FanPediaPage() {
  return <FanPediaView />;
}
