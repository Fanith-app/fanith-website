"use client";

import { BASE_URL } from "@/src/api/endpoint";
import CommunityArticles from "@/src/components/CommunityArticles";
import { useEffect, useState } from "react";

export default function CommunityArticlesWrapper({
  initialArticles,
  activeCategory,
}: any) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);

  const fetchBlogs = async (pageNumber = 1, categoryId = "all") => {
    let url = `${BASE_URL}public/blogs?page=${pageNumber}&limit=6`;

    if (categoryId !== "all") {
      url += `&categoryId=${categoryId}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    const blogs = data?.data?.blogs || [];

    const formatted = blogs.map((blog: any) => ({
      category: blog.category?.name || "General",
      title: blog.title,
      description: blog.description,
      date: new Date(blog.publishedAt).toDateString(),
      image: blog.thumbnailUrl,
      href: `/blog/${blog.slug}`,
    }));

    if (pageNumber === 1) {
      setArticles(formatted);
    } else {
      setArticles((prev: any) => [...prev, ...formatted]);
    }
  };

  // 🔥 category change hone par reload
  useEffect(() => {
    setPage(1);
    fetchBlogs(1, activeCategory);
  }, [activeCategory]);

  return (
    <CommunityArticles
      articles={articles}
      onLoadMore={() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogs(nextPage, activeCategory);
      }}
    />
  );
}











// "use client";

// import { BASE_URL } from "@/src/api/endpoint";
// import CommunityArticles from "@/src/components/CommunityArticles";
// import CommunityHeroTabs from "@/src/components/CommunityHeroTabs";
// import { useState } from "react";

// export default function CommunityArticlesWrapper({
//   initialArticles,
//   categories,
// }: any) {
//   const [articles, setArticles] = useState(initialArticles);
//   const [page, setPage] = useState(1);
//   const [activeTab, setActiveTab] = useState("all");

//   const fetchBlogs = async (pageNumber = 1, categoryId = "all") => {
//     try {
//       let url = `${BASE_URL}public/blogs?page=${pageNumber}&limit=6`;

//       if (categoryId !== "all") {
//         url += `&categoryId=${categoryId}`;
//       }

//       const res = await fetch(url);
//       const data = await res.json();

//       const blogs = data?.data?.blogs || [];

//       const formatted = blogs.map((blog: any) => ({
//         category: blog.category?.name || "General",
//         title: blog.title,
//         description: blog.description,
//         date: new Date(blog.publishedAt).toDateString(),
//         image: blog.thumbnailUrl,
//         href: `/blog/${blog.slug}`,
//       }));

//       if (pageNumber === 1) {
//         setArticles(formatted);
//       } else {
//         setArticles((prev: any) => [...prev, ...formatted]);
//       }
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     }
//   };

//   return (
//     <>
//       Tabs
//       <CommunityHeroTabs
//         tabs={[{ id: "all", name: "All" }, ...categories]}
//         active={activeTab}
//         onChange={(tab) => {
//         setActiveTab(tab.name);
//         setPage(1);
//         fetchBlogs(1, tab.id);
//         }}
//       />

//       Articles
//       <CommunityArticles
//         articles={articles}
//         onLoadMore={() => {
//             const nextPage = page + 1;
//             setPage(nextPage);
//             fetchBlogs(nextPage, activeTab === "All" ? "all" : categories.find((c: any) => c.name === activeTab)?.id);
//         }}
//       />
//     </>
//   );
// }