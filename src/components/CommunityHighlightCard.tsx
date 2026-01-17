"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CommunityHighlightCardProps {
  category: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
}

export default function CommunityHighlightCard({
  category,
  title,
  description,
  date,
  author,
  image,
}: CommunityHighlightCardProps) {
  return (
    <motion.div 
      className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:pt-20 items-center px-4 py-10 md:p-10 text-white transform transition-all duration-500 ease-in-out cursor-pointer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      }}
    
    >
      
      {/* Left Image */}
      <div 
        className="relative h-90 w-50 lg:px-80 xl:px-110 transform transition-all duration-500"
      
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Right Content */}
      <div 
        className="xl:pr-23"
        
      >
        <motion.span 
          className="inline-block rounded-full bg-[#303338] px-6 py-2 text-sm font-semibold mb-6 transform transition-all duration-500"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              } 
            }
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        >
          {category}
        </motion.span>

        <motion.h2 
          className="text-3xl md:text-4xl font-bold leading-tight mb-6 transform transition-all duration-500"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              } 
            }
          }}
        >
          {title}
        </motion.h2>

        <motion.p 
          className="text-2xl text-white/90 text-left leading-relaxed mb-10 transform transition-all duration-500 group-hover:text-white"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              } 
            }
          }}
        >
          {description}
        </motion.p>

        <motion.div 
          className="flex items-center lg:justify-center justify-between gap-20 lg:gap-55 xl:gap-70 text-sm text-white/80 transform transition-all duration-500 group-hover:scale-105 group-hover:text-white/90"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              } 
            }
          }}
        >
          <span>{date} • {author}</span>

          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#"
              className="underline font-semibold hover:text-white transform transition-all duration-300"
            >
              Read More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
