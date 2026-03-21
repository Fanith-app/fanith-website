"use client";

import Banner from "@/src/components/common/Banner";
import { CommunitySearch } from "@/src/components/common/SearchInput";
import CommunityArticles from "@/src/components/CommunityArticles";
import CommunityHeroTabs from "@/src/components/CommunityHeroTabs";
import NewsletterSubscribe from "@/src/components/NewsletterSubscribe";
import { useEffect, useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `https://live.fanith.com/api/v1/public/blogs?page=${pageNumber}&limit=6`
      );
      const data = await res.json();

      const formatted = data.data.data.map((blog: any) => ({
        category: blog.category?.name || "General",
        title: blog.title,
        description: blog.description,
        date: new Date(blog.publishedAt).toDateString(),
        image: blog.thumbnailUrl,
        slug: blog.slug,
      }));

      setArticles((prev) => [...prev, ...formatted]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="w-full">
      <Banner
        title="From the Fan Community"
        description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
        backgroundImage="/assets/images/blog-banner.jpg"
      >
        <CommunitySearch />
        <CommunityHeroTabs active={activeTab} onChange={setActiveTab} />
      </Banner>

      <CommunityArticles
        articles={articles}
        onLoadMore={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchBlogs(nextPage);
        }}
      />

      <NewsletterSubscribe
        onSubmit={(email) => {
          console.log("Subscribed email:", email);
        }}
      />
    </main>
  );
};

export default page;















// "use client"
// import Banner from '@/src/components/common/Banner'
// import { CommunitySearch } from '@/src/components/common/SearchInput'
// import CommunityArticles from '@/src/components/CommunityArticles'
// import CommunityContent from '@/src/components/CommunityContent'
// import CommunityHeroTabs from '@/src/components/CommunityHeroTabs'
// import NewsletterSubscribe from '@/src/components/NewsletterSubscribe'
// import React, { useState } from 'react'

// const page = () => {
//   const [activeTab, setActiveTab] = useState("All");

//   return (
//     <main className='w-full'>
//       <Banner
//         title="From the Fan Community"
//         description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
//         backgroundImage="/assets/images/blog-banner.jpg"
//       >
//         <CommunitySearch />
//         <CommunityHeroTabs active={activeTab} onChange={setActiveTab} />
//       </Banner>
      
//       <CommunityContent activeTab={activeTab} />
      
//       <CommunityArticles
//         articles={[
//           {
//             category: "Announcements",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 April 2025",
//             image: "/assets/images/stadium1.png",
//           },
//           {
//             category: "Fan Stories",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 April 2025",
//             image: "/assets/images/stadium2.png",
//           },
//           {
//             category: "Commentary",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 April 2025",
//             image: "/assets/images/stadium3.png",
//           },
//           {
//             category: "Announcements",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 April 2025",
//             image: "/assets/images/stadium1.png",
//           },
//           {
//             category: "Fan Stories",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 April 2025",
//             image: "/assets/images/stadium2.png",
//           },
//           {
//             category: "Commentary",
//             title: "Heading",
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//             date: "24 Perfect 2025",
//             image: "/assets/images/stadium3.png",
//           },
//         ]}
//         onLoadMore={() => console.log("Load more clicked")}
//       />

//       <NewsletterSubscribe
//         onSubmit={(email) => {
//           console.log("Subscribed email:", email);
//         }}
//       />

//     </main>
//   )
// }

// export default page