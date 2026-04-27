"use client";

import { BASE_URL } from "@/src/api/endpoint";
import Banner from "@/src/components/common/Banner";
import { CommunitySearch } from "@/src/components/common/SearchInput";
import { useEffect, useState } from "react";
import CommunityArticles from "../CommunityArticles";
import CommunityHeroTabs from "../CommunityHeroTabs";

const BannerAndArticleWrapper = ({ initialArticles = [], initialCategories = [] }: any) => {
  const [activeTab, setActiveTab] = useState("All");
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        const res = await fetch(`${BASE_URL}public/blogs/categories`);
        const data = await res.json();
        setCategories(data.data);
      };

      fetchCategories();
    }
  }, []);

  const fetchBlogs = async (pageNumber = 1, categoryId?: string) => {
    try {
      let url = `${BASE_URL}public/blogs?page=${pageNumber}&limit=6`;

      if (categoryId && categoryId !== "all") {
        url += `&categoryId=${categoryId}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.data.data.map((blog: any) => ({
        category: blog.category?.name || "General",
        title: blog.title,
        description: blog.description,
        date: new Date(blog.publishedAt).toDateString(),
        image: blog.thumbnailUrl,
        slug: blog.slug,
      }));

      if (pageNumber === 1) {
        setArticles(formatted);
      } else {
        setArticles((prev) => [...prev, ...formatted]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (initialArticles.length === 0) {
      fetchBlogs(1, "all");
    }
  }, []);

  return (
    <main className="w-full">
      <Banner
        title="From the Fan Community"
        description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
        backgroundImage="/assets/images/blog-page-banner.webp"
      >
        <CommunitySearch />
        <CommunityHeroTabs
          tabs={[{ id: "all", name: "All" }, ...categories]}
          active={activeTab}
          onChange={(tab) => {
            setActiveTab(tab.name);
            setPage(1);
            fetchBlogs(1, tab.id);
          }}
        />
      </Banner>

      <CommunityArticles
        articles={articles}
        onLoadMore={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchBlogs(
            nextPage,
            activeTab === "All"
              ? "all"
              : categories.find((c) => c.name === activeTab)?.id
          );
        }}
      />
    </main>
  );
};

export default BannerAndArticleWrapper;