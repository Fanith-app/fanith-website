"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function CommunitySearch() {
  return (
    <motion.div 
      className="mt-10 flex justify-center"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }}
    >
      <motion.div 
        className="flex w-full max-w-xl items-center gap-3 rounded-full border border-white/50 px-6 py-3 backdrop-blur"
        whileHover={{ 
          scale: 1.02, 
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileFocus={{ 
          scale: 1.02, 
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
        >
          <Search className="h-5 w-5 text-white" />
        </motion.div>
        <motion.input
          placeholder="Search articles"
          className="w-full bg-transparent text-white placeholder-white/70 outline-none"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.5
          }}
          whileFocus={{ 
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
      </motion.div>
    </motion.div>
  );
}
