"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MeetTheTeamCardShape from "../ui/MeetTheTeamCardShape";

const posts = [
  {
    category: "Announcements",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
  },
  {
    category: "Fan Stories",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
  },
  {
    category: "Commentary",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/BLOG_CARD_Landing_Page_1.webp",
  },
];

export default function FanCommunity() {
  return (
    <section className="bg-[#141414] py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
      >
        {/* Heading */}
        <motion.h2 
          className="text-center text-4xl font-bold mb-14 text-white"
          variants={{
            hidden: { y: 50, opacity: 0, scale: 0.9 },
            visible: { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              } 
            }
          }}
        >
          From the Fan Community
        </motion.h2>

        {/* Cards */}
        <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={index}
          className="relative w-full h-107.5 overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
        >
          {/* SVG Background */}
          <MeetTheTeamCardShape />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col h-full">

            {/* Category (Top Label Proper Position) */}
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-white text-lg font-medium pointer-events-none">
              {post.category}
            </div>

            {/* Image */}
            <div className="w-full h-52.5 mt-3.25 pr-2">
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  {post.title}
                </h3>

                <p className="text-[#c3c3c3] text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-center mt-6 text-sm">
                <span className="text-[#960018]">
                  {post.date}
                </span>

                <button className="text-[#960018] hover:underline">
                  Read More
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      ))}
    </motion.div>
        {/* <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.2
              } 
            }
          }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 60, opacity: 0, scale: 0.9, rotateX: 15 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  } 
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card
                className="relative overflow-hidden shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer bg-[#202020] [clip-path:polygon(20px_0,calc(100%-30px)_0,100%_30px,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] rounded-none border-2 border-[#FFFFFF]"
              >
                Image
                <motion.div 
                  className="absolute top-0 left-0 h-56 w-full"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.1 + index * 0.1
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <CardContent className="pt-55">
                  Category
                  <motion.span 
                    className="inline-block mb-4 rounded-full bg-linear-to-r from-[#D60000] to-[#FF0000] px-4 py-1 text-sm font-medium text-white"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.3 + index * 0.1
                    }}
                  >
                    {post.category}
                  </motion.span>

                  Content
                  <motion.h3 
                    className="text-xl text-[#FFFFFF] font-semibold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.4 + index * 0.1
                    }}
                  >
                    {post.title}
                  </motion.h3>

                  <motion.p 
                    className="text-sm text-[#C3C3C3] leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.5 + index * 0.1
                    }}
                  >
                    {post.description}
                  </motion.p>

                  Footer
                  <motion.div 
                    className="flex items-center justify-between text-sm font-medium text-[#8B0000]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.6 + index * 0.1
                    }}
                  >
                    <span>{post.date}</span>
                    <Link
                      href="#"
                      className="underline underline-offset-2 hover:text-[#D60000] transition-colors duration-200"
                    >
                      Read More
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
}
