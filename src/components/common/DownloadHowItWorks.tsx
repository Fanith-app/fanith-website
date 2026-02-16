"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    category: "Announcements",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/fan-img1.png",
  },
  {
    category: "Fan Stories",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/fan-img2.png",
  },
  {
    category: "Commentary",
    title: "Heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "24 April 2025",
    image: "/assets/images/fan-img3.png",
  },
];

export default function DownloadHowItWorks() {
  return (
    <section className="pt-10 pb-15">
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
          className="text-center text-4xl font-bold mb-2 font-[Montserrat]/700 text-white"
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
          How It Works
        </motion.h2>
        <motion.p
            className="text-md md:text-xl xl:text-[21px] leading-relaxed text-[#c3c3c3] tracking-wider text-center mb-14 font-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
              }}
            >
              Everything fans do during a match — now in one place.
            </motion.p>

        {/* Cards */}
        <motion.div 
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
                className="relative overflow-hidden rounded-3xl border border-red-600 shadow-2xl bg-gray-100 transform transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer"
              >
                {/* Image */}
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
                  {/* Category */}
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

                  {/* Content */}
                  <motion.h3 
                    className="text-xl text-[#111111] font-semibold mb-3"
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
                    className="text-sm text-[#333333] leading-relaxed mb-6"
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

                  {/* Footer */}
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
        </motion.div>
      </motion.div>
    </section>
  );
}