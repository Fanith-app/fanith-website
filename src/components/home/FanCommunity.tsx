"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  category?: {
    name: string;
  };
}

export default function FanCommunity() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://live.fanith.com/api/v1/public/blogs?page=1&limit=6",
        );
        const data = await res.json();

        // ✅ Latest first (date sort)
        const sortedBlogs = data.data.data.sort(
          (a: Blog, b: Blog) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        );

        // ✅ Only latest 3 दिखाओ (change kar sakte ho)
        setBlogs(sortedBlogs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-17 text-center">
          From the Fan Community
        </h2>

        {/* Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`}>
              <div className="group h-full cursor-pointer rounded-3xl border border-[#960018] overflow-hidden bg-[#141414] hover:scale-105 transition duration-300 shadow-lg">
                Image
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.thumbnailUrl || "/assets/images/stadium1.png"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                Content
                <div className="p-5">
                  <div className="mt-3 mb-7">
                    <span className="rounded-full bg-[#960018] px-4 py-1 text-sm font-semibold text-white">
                      {blog.category?.name}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-2 mb-4 leading-relaxed line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-[#c3c3c3] leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  <p className="text-sm text-[#960018] mt-4">
                    {new Date(blog.publishedAt).toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          
        </div> */}

        {/* New  */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {blogs.map((article, index) => (
            <motion.div
              key={index}
              variants={{
                // hidden: { opacity: 0 },
                visible: {
                  // opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              {/* ✅ FULL CARD CLICKABLE */}
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="group h-full overflow-hidden rounded-3xl border border-[#960018] bg-[#141414] transform transition-all duration-500 hover:scale-105 cursor-pointer">
                  
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden -mt-8">
                    <Image
                      src={article.thumbnailUrl || "/assets/images/stadium1.png"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="px-4">
                    {/* Category */}
                    <span className="inline-block rounded-full bg-[#960018] px-4 py-1 text-sm font-semibold text-white mb-4">
                      {article.category?.name}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#c3c3c3] leading-relaxed mb-6 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#960018]">
                        {new Date(article.publishedAt).toDateString()}
                      </span>

                      <span className="font-semibold text-[#960018] hover:underline">
                        Read More
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import CommunityArticles from "../CommunityArticles";

// interface Article {
//   category: string;
//   title: string;
//   description: string;
//   date: string;
//   image: string;
//   slug: string;
// }

// interface Props {
//   articles: Article[];
// }

// export default function FanCommunity({ articles }: Props) {
//   // ✅ Sort by latest date + pick top 3
//   const latestArticles = [...articles]
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 3);

//   return (
//     <section className="bg-[#202020] py-24">
//       <div className="mx-auto max-w-7xl px-4 md:px-6">

//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//           From the Fan Community
//         </h2>

//         Reuse same component
//         <CommunityArticles articles={latestArticles} />
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import MeetTheTeamCardShape from "../ui/MeetTheTeamCardShape";

// const posts = [
//   {
//     category: "Announcements",
//     title: "Heading",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//     date: "24 April 2025",
//     image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
//   },
//   {
//     category: "Fan Stories",
//     title: "Heading",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//     date: "24 April 2025",
//     image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
//   },
//   {
//     category: "Commentary",
//     title: "Heading",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
//     date: "24 April 2025",
//     image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
//   },
// ];

// export default function FanCommunity() {
//   return (
//     <section className="bg-[#141414] py-20">
//       <motion.div
//         className="max-w-7xl mx-auto px-4 md:px-15"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2, margin: "-50px" }}
//         variants={{
//           hidden: { opacity: 0 },
//           visible: {
//             opacity: 1,
//             transition: {
//               duration: 0.6,
//               ease: [0.25, 0.46, 0.45, 0.94],
//               staggerChildren: 0.15,
//               delayChildren: 0.1
//             }
//           }
//         }}
//       >
//         Heading
//         <motion.h2
//           className="text-center text-4xl font-bold mb-14 text-white"
//           variants={{
//             hidden: { y: 50, opacity: 0, scale: 0.9 },
//             visible: {
//               y: 0,
//               opacity: 1,
//               scale: 1,
//               transition: {
//                 duration: 0.8,
//                 ease: [0.25, 0.46, 0.45, 0.94],
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 15
//               }
//             }
//           }}
//         >
//           From the Fan Community
//         </motion.h2>

//         Cards
//         <motion.div
//       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={{
//         visible: { transition: { staggerChildren: 0.2 } },
//       }}
//     >
//       {posts.map((post, index) => (
//         <motion.div
//           key={index}
//           className="relative w-full h-107.5 overflow-hidden"
//           variants={{
//             hidden: { opacity: 0, y: 60 },
//             visible: {
//               opacity: 1,
//               y: 0,
//               transition: { duration: 0.8 },
//             },
//           }}
//         >
//           SVG Background
//           <MeetTheTeamCardShape />

//           Main Content
//           <div className="relative z-10 flex flex-col h-full">

//             Category (Top Label Proper Position)
//             <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-white text-lg font-medium pointer-events-none">
//               {post.category}
//             </div>

//             Image
//             <div className="w-full h-52.5 mt-3.25 pr-2">
//               <div className="w-full h-full overflow-hidden">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             Text Content
//             <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-6">
//               <div>
//                 <h3 className="text-white text-lg font-semibold mb-3">
//                   {post.title}
//                 </h3>

//                 <p className="text-[#c3c3c3] text-sm leading-relaxed">
//                   {post.description}
//                 </p>
//               </div>

//               Bottom Row
//               <div className="flex justify-between items-center mt-6 text-sm">
//                 <span className="text-[#960018]">
//                   {post.date}
//                 </span>

//                 <button className="text-[#960018] hover:underline">
//                   Read More
//                 </button>
//               </div>
//             </div>

//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//       </motion.div>
//     </section>
//   );
// }
