"use client";

import { Suspense } from "react";
import Banner from "@/src/components/common/Banner";
import CenteredCTA from "@/src/components/common/ExperienceFanith";
import HighlightCards from "@/src/components/common/HighlightCards";
import FeatureTabs from "@/src/components/FeatureTabs";

export default function FeaturesPage() {
  return (
    <main className="w-full">
      <Banner
        title="The Ultimate Experience for Every Sports Fan"
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
        backgroundImage="/assets/images/featurebanner.png"
        bottomcurve="lg:h-150 lg:[clip-path:ellipse(80%_90%_at_50%_0%)]  "
        // ctaText="Join Beta"
        // ctaLink="/join-beta"
      />

      {/* ================= FEATURE TABS SECTION ================= */}
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <FeatureTabs />
      </Suspense>

      <HighlightCards
        items={[
          {
            title: "Pick Your Team",
            description: "Chat instantly during every match.",
            image: "/assets/images/pickteam.jpg",
          },
          {
            title: "Engage Live",
            description: "Explore FanPedia stats & insights.",
            image: "/assets/images/engagelive.jpg",
          },
          {
            title: "Compete & Rise",
            description: "Build your FanDom score and unlock rewards.",
            image: "/assets/images/coin.jpg",
          },
        ]}
      />

      <CenteredCTA
        title="Be the First to Experience Fanith"
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
      />

    </main>
  );
}