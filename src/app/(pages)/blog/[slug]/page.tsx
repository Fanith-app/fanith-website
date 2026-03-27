import { BASE_URL } from "@/src/api/endpoint";
import BlogDetail from "./BlogDetail";

export async function generateStaticParams() {
  const res = await fetch(
    `${BASE_URL}public/blogs?limit=100`
  );
  const data = await res.json();
  return data.data.data.map((blog: any) => ({ slug: blog.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetail slug={slug} />;
}
