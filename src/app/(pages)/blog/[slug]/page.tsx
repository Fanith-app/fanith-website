import { BASE_URL } from "@/src/api/endpoint";
import { Metadata } from "next";
import BlogDetail from "./BlogDetail";

export async function generateStaticParams() {
  const res = await fetch(
    `${BASE_URL}public/blogs?limit=100`
  );
  const data = await res.json();
  return data.data.data.map((blog: any) => ({ slug: blog.slug }));
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
