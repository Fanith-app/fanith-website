// "use client";

import DownloadBanner from '@/src/components/common/DownlaodBanner';
import DownloadHowItWorks from '@/src/components/common/DownloadHowItWorks';
import DownloadSecondSection from '@/src/components/common/DownloadSecondSection';
import CenteredCTA from '@/src/components/common/ExperienceFanith';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Download Fanith App – Live Cricket Fan Chat for Android & iOS",
  description: "Download the Fanith app on Android or iOS. Join live IPL Fan Rooms, chat with cricket fans in real time, earn badges, and never miss a match moment. Free to download.",
  alternates: {
    canonical: "https://www.fanith.com/download",
  },
}

const page = () => {
  return (
    <main className='w-full'>
      <DownloadBanner
        title="Download Fanith"
        description="Follow the match, chat live, and share moments — all in one place."
        backgroundImage="/assets/images/download-banner.webp"
      />

      <DownloadSecondSection
        image="/assets/images/download-second-section.webp"
      />

      <DownloadHowItWorks />

      <CenteredCTA
        title={
          <>
            Ready to watch matches the{" "}
            <span className="text-[#960018]">Fanith</span> way?
          </>
        }
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
      />

    </main>
  )
}

export default page