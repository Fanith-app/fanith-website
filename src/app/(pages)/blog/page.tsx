import BlogPageWrapper from "@/src/components/ui/BlogPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fanith Blog – IPL Match Highlights, Fan Stories & Cricket Updates",
  description: "Read IPL match highlights, fan stories, commentary recaps, and Fanith platform news. Stay in the game with fresh cricket content from the Fanith community.",
}

export default function Page() {
  return <BlogPageWrapper />;
}