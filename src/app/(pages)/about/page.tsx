"use client";

import Banner from '@/src/components/common/Banner';
import CenteredCTA from '@/src/components/common/ExperienceFanith';
import MeetTheTeam from '@/src/components/MeetTheTeam';
import OurStory from '@/src/components/OurStory';

const page = () => {
  return (
    <main className='w-full'>
      <Banner
        title="About Fanith"
        description="A sports fan platform built to connect fans, celebrate passion, and bring stadium energy to your screen."
        backgroundImage="/assets/images/about-us-page-banner.webp"
        ctaText="Download App"
        ctaLink="/download"
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

      <OurStory
        founderTitle="A Message from Our Founder"
        founderMessage="Fanith was born from a simple belief: sports are better when shared. My passion is to bridge the gap between the screen and the stands, creating a high-energy home where every fan's voice contributes to the global 'Live Match Energy'. We aren't just building an app; we are building India’s strongest community where your loyalty finally has a leaderboard."
        image="/assets/images/team/DEEPAK-BAID.webp"
        coFounderTitle="A Message from Our Co-Founder"
        coFounderMessage="My mission is to translate the raw emotion of a stadium into a seamless digital experience. By engineering real-time Game Rooms and gamified 'FanPedia' statistics, we ensure that the technology behind Fanith is as fast and dynamic as the sports we love. We are committed to a platform that is robust, interactive, and built for the future of digital fandom."
        coFounderImage="/assets/images/team/meenal-jain.webp"
      />

      <MeetTheTeam
        members={[
          {
            name: "Punith Raj",
            designation: "Operation",
            superpower: "Data Crunching",
            favouriteTeam: "CSK",
            image: "/assets/images/team/Punith-Raj.jpeg",
          },
          {
            name: "Swarnali B",
            designation: "User on Boarding",
            superpower: "Content Editor",
            favouriteTeam: "KKR",
            image: "/assets/images/team/Swarnali-B.jpeg",
          },
          {
            name: "Shailaja VB",
            designation: "Digital Marketing",
            superpower: "Marketing",
            favouriteTeam: "RCB",
            image: "/assets/images/team/Shailaja-B.webp",
          },
          {
            name: "Faisal Khan",
            designation: "Full-Stack",
            superpower: "Data Crunching",
            favouriteTeam: "CSK",
            image: "/assets/images/team/Faisal-Jawed-Khan.jpeg",
          },
        ]}
      />
      <CenteredCTA
        title={
          <>
            Be the First to Experience{" "}
            <span className="text-[#960018]">Fanith</span>
          </>
        }
        description="Explore everything Fanith offers — from live match chat rooms to FanDom rewards and FanPedia player insights."
      />

    </main>
  )
}

export default page