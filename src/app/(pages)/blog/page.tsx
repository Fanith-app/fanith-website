"use client"
import Banner from '@/src/components/common/Banner'
import { CommunitySearch } from '@/src/components/common/SearchInput'
import CommunityArticles from '@/src/components/CommunityArticles'
import CommunityContent from '@/src/components/CommunityContent'
import CommunityHeroTabs from '@/src/components/CommunityHeroTabs'
import NewsletterSubscribe from '@/src/components/NewsletterSubscribe'
import { useState } from 'react'

const page = () => {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <main className='w-full'>
      <Banner
        title="From the Fan Community"
        description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
        backgroundImage="/assets/images/blog-page-banner.webp"
      >
        <CommunitySearch />
        <CommunityHeroTabs active={activeTab} onChange={setActiveTab} />
      </Banner>
      
      <CommunityContent activeTab={activeTab} />
      
      <CommunityArticles
        articles={[
          {
            category: "Announcements",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 April 2025",
            image: "/assets/images/stadium1.png",
          },
          {
            category: "Fan Stories",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 April 2025",
            image: "/assets/images/stadium2.png",
          },
          {
            category: "Commentary",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 April 2025",
            image: "/assets/images/stadium3.png",
          },
          {
            category: "Announcements",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 April 2025",
            image: "/assets/images/stadium1.png",
          },
          {
            category: "Fan Stories",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 April 2025",
            image: "/assets/images/stadium2.png",
          },
          {
            category: "Commentary",
            title: "Heading",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            date: "24 Perfect 2025",
            image: "/assets/images/stadium3.png",
          },
        ]}
        onLoadMore={() => console.log("Load more clicked")}
      />

      <NewsletterSubscribe
        onSubmit={(email) => {
          console.log("Subscribed email:", email);
        }}
      />

    </main>
  )
}

export default page