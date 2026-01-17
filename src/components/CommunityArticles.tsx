"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Article {
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
  href?: string;
}

interface CommunityArticlesProps {
  articles: Article[];
  onLoadMore?: () => void;
}

export default function CommunityArticles({
  articles,
  onLoadMore,
}: CommunityArticlesProps) {
  return (
    <section className="bg-white py-24">
      <motion.div 
        className="mx-auto max-w-7xl px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >

        {/* Articles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.1
              } 
            }
          }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { 
                  opacity: 0
                },
                visible: { 
                  opacity: 1,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1
                  } 
                }
              }}
             
            >
              <Card
                className="group overflow-hidden rounded-3xl border border-red-600 bg-[#eeeeee] shadow-[0_10px_60px_-20px_#000000] transform transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer"
              >
                {/* Image */}
                <motion.div 
                  className="relative h-56 w-full overflow-hidden -mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.2 + index * 0.05
                  }}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform transition-all duration-500 group-hover:scale-105"
                  />
                </motion.div>

                <CardContent className="px-4">
                  {/* Category */}
                  <motion.span 
                    className="inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-semibold text-white mb-4 transform transition-all duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {article.category}
                  </motion.span>

                  {/* Title */}
                  <motion.h3 
                    className="text-xl font-bold mb-3 transform transition-all duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {article.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p 
                    className="text-sm text-gray-700 leading-relaxed mb-6 transform transition-all duration-500 group-hover:text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {article.description}
                  </motion.p>

                  {/* Footer */}
                  <motion.div 
                    className="flex items-center justify-between text-sm transform transition-all duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <span className="font-medium text-red-600">
                      {article.date}
                    </span>

                    <motion.div
                      
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={article.href || "#"}
                        className="font-semibold text-red-600 hover:underline"
                      >
                        Read More
                      </Link>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {onLoadMore && (
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3
            }}
          >
            <motion.button
              onClick={onLoadMore}
              className="rounded-lg border border-[#9E1D1D] px-10 py-4 font-semibold text-[#9E1D1D] transform transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white hover:scale-105 "
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
}
