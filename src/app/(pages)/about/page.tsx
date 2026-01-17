"use client";

import React from 'react'
import VisionMission from '@/src/components/common/VisionMission';
import OurStory from '@/src/components/OurStory';
import MeetTheTeam from '@/src/components/MeetTheTeam';
import Banner from '@/src/components/common/Banner';
import { motion } from 'framer-motion';

const page = () => {
  return (
    <main className='w-full'>
      <Banner
        title="About Fanith"
        description="A sports fan platform built to connect fans, celebrate passion, and bring stadium energy to your screen."
        backgroundImage="/assets/images/generated-image (8) 1.png"
        // ctaText="Join Beta"
        // ctaLink="/join-beta"
      />

      <VisionMission
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
      />

      <OurStory
        storyText="Fanith was created to solve a simple problem — fans had no single place to celebrate matches together online. With live game rooms, FanDom points, and FanPedia knowledge, Fanith brings fans closer to the action and to each other, no matter where they are."
        founderTitle="A Message from Our Founder"
        founderMessage="A short paragraph about why Fanith exists, belief in fan communities, passion for sports, and aim of building India's strongest sports fan platform."
        image="/assets/images/ourstory.jpg"
      />

      <MeetTheTeam
        members={[
          {
            name: "Full Name",
            designation: "Designation",
            superpower: "Data Crunching",
            favouriteTeam: "RCB",
            image: "/assets/images/member1.jpg",
          },
          {
            name: "Full Name",
            designation: "Designation",
            superpower: "Data Crunching",
            favouriteTeam: "RCB",
            image: "/assets/images/member2.jpg",
          },
          {
            name: "Full Name",
            designation: "Designation",
            superpower: "Data Crunching",
            favouriteTeam: "RCB",
            image: "/assets/images/member3.jpg",
          },
        ]}
      />

    </main>
  )
}

export default page