import { BASE_URL } from "@/src/api/endpoint";
import type { Blog } from "@/src/types/blog";
import { Metadata } from "next";
import BlogDetail from "./BlogDetail";

/** Slugs outside generateStaticParams render on demand rather than 404. */
export const dynamicParams = true;

/**
 * Prebuilds known blog slugs. If the API is unreachable or answers with a
 * non-JSON error page, the build still succeeds and every slug renders on
 * its first request instead.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${BASE_URL}public/blogs?limit=100`);
    if (!res.ok) {
      console.warn(`Blog slugs not prebuilt: API responded ${res.status}`);
      return [];
    }
    const data = await res.json();
    const blogs: Blog[] = data?.data?.data ?? [];
    return blogs.map((blog) => ({ slug: blog.slug }));
  } catch (error) {
    console.warn("Blog slugs not prebuilt:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    const res = await fetch(`${BASE_URL}public/blogs/${slug}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    const blog = data?.data;

    return {
      title: blog?.title || "Fanith Blog – IPL Match Highlights, Fan Stories & Cricket Updates",

      description:
        blog?.metaDescription ||
        blog?.description ||
        "Read IPL match highlights, fan stories, commentary recaps, and Fanith platform news. Stay in the game with fresh cricket content from the Fanith community.",

      alternates: {
        canonical: `https://www.fanith.com/blog/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Fanith Blog",
      description: "Latest cricket updates and match reports",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetail slug={slug} />;
}
