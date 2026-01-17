"use client";

import { motion } from "framer-motion";

const tabs = [
  "All",
  "Match Highlights",
  "Fan Stories",
  "Commentary",
  "Announcements",
];

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

export default function CommunityHeroTabs({ active, onChange }: Props) {
  return (
    <motion.div 
      className="mt-10 flex flex-wrap justify-center gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.08,
            delayChildren: 0.3
          }
        }
      }}
    >
      {tabs.map((tab, index) => (
        <motion.button
          key={tab}
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
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer ${
            active === tab
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {tab}
        </motion.button>
      ))}
    </motion.div>
  );
}
