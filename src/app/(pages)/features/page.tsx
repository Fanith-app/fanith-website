"use client";

import Banner from "@/src/components/common/Banner";
import CenteredCTA from "@/src/components/common/ExperienceFanith";
import HowItWorks from "@/src/components/home/HowItWorks";
import LiveMatchEnergy from "@/src/components/home/LiveMatchEnergy";

export default function FeaturesPage() {
  return (
    <main className="w-full">
      <Banner
        title="The Ultimate Experience for Every Sports Fan"
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
        backgroundImage="/assets/images/Features-Banner-Image.webp"
        bottomcurve="lg:h-150 lg:[clip-path:ellipse(80%_90%_at_50%_0%)]  "
        ctaText="Download App"
        ctaLink="/join-beta"
      />

      {/* ================= FEATURE TABS SECTION ================= */}
      {/* <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <FeatureTabs />
      </Suspense> */}

      <LiveMatchEnergy />

      {/* <HighlightCards
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
      /> */}

      <HowItWorks />

      <CenteredCTA
        title={
          <>
            Ready to watch matches the{" "}
            <span className="text-[#960018]">Fanith</span>{" "} way?
          </>
        }
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
      />

    </main>
  );
}