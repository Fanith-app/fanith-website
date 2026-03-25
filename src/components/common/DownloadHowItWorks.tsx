"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const posts = [
  {
    category: "Step 1",
    title: "Download The App",
    image: "/assets/images/Step-1.webp",
  },
  {
    category: "Step 2",
    title: "Pick Your Team",
    image: "/assets/images/Step-2.webp",
  },
  {
    category: "Step 3",
    title: "Join Live Fan Rooms During Matches",
    image: "/assets/images/Step-3.webp",
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
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
  {posts.map((article, index) => (
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
                <Card className="group h-full overflow-hidden rounded-2xl border border-[#960018] bg-[#141414] transform transition-all duration-500 hover:scale-105 cursor-pointer">
                  
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden -mt-8">
                    <Image
                      src={article.image || "/assets/images/stadium1.png"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="px-4">
                    {/* Category */}
                    <span className="inline-block rounded-full bg-[#960018] px-4 py-1 text-sm font-semibold text-white mb-4">
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {article.title}
                    </h3>
                  </CardContent>
                </Card>
            </motion.div>
  ))}
</motion.div>
      </motion.div>
    </section>
  );
}