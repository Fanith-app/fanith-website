import { BASE_URL } from "@/src/api/endpoint";
import Banner from "@/src/components/common/Banner";
import CommunityArticles from "@/src/components/CommunityArticles";
import BlogTabsWrapper from "@/src/components/ui/BlogTabsWrapper";
import NewsletterWrapper from "@/src/components/ui/NewsletterWrapper";

// ✅ Fetch blogs (SSR/ISR)
async function getBlogs() {
  const res = await fetch(
    `${BASE_URL}public/blogs?page=1&limit=6`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();

  return data?.data?.blogs?.map((blog: any) => ({
    category: blog.category?.name || "General",
    title: blog.title,
    description: blog.description,
    date: new Date(blog.publishedAt).toDateString(),
    image: blog.thumbnailUrl,
    slug: blog.slug,
  })) || [];
}

// ✅ Fetch categories
async function getCategories() {
  const res = await fetch(`${BASE_URL}public/blogs/categories`, {
    next: { revalidate: 300 },
  });

  const data = await res.json();
  return data?.data || [];
}

export default async function Page() {
  const articles = await getBlogs();
  const categories = await getCategories();

  return (
    <main className="w-full">
      <Banner
        title="From the Fan Community"
        description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
        backgroundImage="/assets/images/blog-page-banner.webp"
      >
        <BlogTabsWrapper categories={categories} />
      </Banner>

      {/* ✅ SSR content */}
      <CommunityArticles articles={articles} />

      <NewsletterWrapper />
    </main>
  );
}









// "use client";

// import Banner from "@/src/components/common/Banner";
// import { CommunitySearch } from "@/src/components/common/SearchInput";
// import CommunityArticles from "@/src/components/CommunityArticles";
// import CommunityHeroTabs from "@/src/components/CommunityHeroTabs";
// import NewsletterSubscribe from "@/src/components/NewsletterSubscribe";
// import { BASE_URL } from "@/src/api/endpoint";
// import { useEffect, useState } from "react";

// const page = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [articles, setArticles] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await fetch(
//         `${BASE_URL}public/blogs/categories`
//       );
//       const data = await res.json();
//       setCategories(data.data);
//     };

//     fetchCategories();
//   }, []);

//   const fetchBlogs = async (pageNumber = 1, categoryId?: string) => {
//         try {
//       let url = `${BASE_URL}public/blogs?page=${pageNumber}&limit=6`;

//       if (categoryId && categoryId !== "all") {
//         url += `&categoryId=${categoryId}`;
//       }

//       const res = await fetch(url);
//       const data = await res.json();

//       const formatted = data.data.data.map((blog: any) => ({
//         category: blog.category?.name || "General",
//         title: blog.title,
//         description: blog.description,
//         date: new Date(blog.publishedAt).toDateString(),
//         image: blog.thumbnailUrl,
//         slug: blog.slug,
//       }));

//       if (pageNumber === 1) {
//         setArticles(formatted);
//       } else {
//         setArticles((prev) => [...prev, ...formatted]);
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(1, "all");
//   }, []);

//   return (
//     <main className="w-full">
//       <Banner
//         title="From the Fan Community"
//         description="Match highlights, fan stories, commentary recaps, and updates from the Fanith universe."
//         backgroundImage="/assets/images/blog-page-banner.webp"
//       >
//         <CommunitySearch />
//         <CommunityHeroTabs
//           tabs={[{ id: "all", name: "All" }, ...categories]}
//           active={activeTab}
//           onChange={(tab) => {
//             setActiveTab(tab.name);
//             setPage(1);
//             fetchBlogs(1, tab.id);
//           }}
//         />
//       </Banner>

//       <CommunityArticles
//         articles={articles}
//         onLoadMore={() => {
//           const nextPage = page + 1;
//           setPage(nextPage);
//           fetchBlogs(nextPage, activeTab === "All" ? "all" : categories.find(c => c.name === activeTab)?.id);
//         }}
//       />

//       <NewsletterSubscribe
//         onSubmit={(email) => {
//           console.log("Subscribed email:", email);
//         }}
//       />
//     </main>
//   );
// };

// export default page;