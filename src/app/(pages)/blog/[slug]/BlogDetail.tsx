"use client";

import { BASE_URL } from "@/src/api/endpoint";
import { useEffect, useRef, useState } from "react";

const BlogDetail = ({ slug }: { slug: string }) => {
  const [blog, setBlog] = useState<any>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
        hasFetched.current = true;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}public/blogs/${slug}`
        );
        const data = await res.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);
  const getReadTime = (html = "") => {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (words === 0) return 1;

  return Math.ceil(words / 200);
};
const readTime = blog?.readTime
  ? blog.readTime
  : getReadTime(blog?.contentHtml || "");

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-10 px-4 text-white leading-8.25 text-justify">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-[#c3c3c3] mb-4">
        {new Date(blog.publishedAt).toDateString()} • {readTime} min read
      </p>

      <img
        src={blog.thumbnailUrl}
        alt={blog.title}
        className="w-full rounded-lg mb-6"
      />

      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
    </div>
  );
};

export default BlogDetail;
