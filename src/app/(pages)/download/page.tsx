"use client";

import DownloadBanner from '@/src/components/common/DownlaodBanner';
import DownloadHowItWorks from '@/src/components/common/DownloadHowItWorks';
import DownloadSecondSection from '@/src/components/common/DownloadSecondSection';
import CenteredCTA from '@/src/components/common/ExperienceFanith';

const page = () => {
  return (
    <main className='w-full'>
      <DownloadBanner
        title="Download Fanith"
        description="Follow the match, chat live, and share moments — all in one place."
        backgroundImage="/assets/images/download-banner.webp"
        ctaText="Download App"
        ctaLink="/join-beta"
      />

      {/* <VisionMission
        items={[
          {
            title: "Our Vision",
            description:
              "To build the world's most engaging digital community for sports fans — where passion, connection, and excitement come alive.",
            icon: "/assets/images/vision-icon.png",
          },
          {
            title: "Our Mission",
            description:
              "To empower fans with real-time engagement tools, community-driven content, and features that transform the way people experience sports digitally.",
            icon: "/assets/images/mission-icon.png",
          },
        ]}
      /> */}

      <DownloadSecondSection
        image="/assets/images/download-second-section.webp"
      />

      <DownloadHowItWorks />

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
  )
}

export default page