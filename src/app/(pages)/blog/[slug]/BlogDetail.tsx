"use client";

import { useEffect, useState } from "react";

const BlogDetail = ({ slug }: { slug: string }) => {
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://live.fanith.com/api/v1/public/blogs/${slug}`
        );
        const data = await res.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-500 mb-4">
        {new Date(blog.publishedAt).toDateString()} • {blog.readTime} min read
      </p>

      <img
        src={blog.thumbnailUrl}
        alt={blog.title}
        className="w-full rounded-lg mb-6"
      />

      <div dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
    </div>
  );
};

export default BlogDetail;
