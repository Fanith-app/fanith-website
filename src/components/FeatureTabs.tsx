"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TABS = [
  {
    key: "game-room",
    label: "Game Room",
    title: "Game Room – Real-time match action",
    description:
      "Stay connected with fans during live matches. Chat in real time, vote in live polls, send reactions during big moments, and never miss a highlight. The Game Room brings the energy of the stadium directly to your screen.",
    image: "/assets/images/gameroom.png",
  },
  {
    key: "fandom",
    label: "FanDom",
    title: "FanDom — Show your fan power",
    description:
      "Every action you take in Fanith earns you FanDom points — posting reactions, winning polls, sharing highlights, and supporting your team. Collect badges, rise through levels, and prove your loyalty in rankings visible to all fans.",
    image: "/assets/images/fandom.png",
  },
  {
    key: "tribe",
    label: "Fan Tribe",
    title: "Fan Tribe — Support your team",
    description:
      "Join your team's official fan tribe and become part of a dedicated community. Participate in team-based challenges, celebrate victories together, and take on rival tribes during tournaments and special match events.",
    image: "/assets/images/fantribe.png",
  },
  {
    key: "fanpedia",
    label: "Fan Pedia",
    title: "FanPedia — Sports knowledge hub",
    description:
      "FanPedia is a community-driven sports directory built by fans. Browse detailed profiles of players and teams, learn match history, explore stats, and contribute photos, videos, and insights — earning FanDom points as you contribute.",
    image: "/assets/images/fanpedia.png",
  },
];

export default function FeatureTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Set initial tab based on URL parameter
  const [activeTab, setActiveTab] = useState(() => {
    if (tabParam) {
      const foundTab = TABS.find(tab => tab.key === tabParam);
      return foundTab || TABS[0];
    }
    return TABS[0];
  });

  // Update tab when URL parameter changes and scroll to tabs
  useEffect(() => {
    if (tabParam) {
      const foundTab = TABS.find(tab => tab.key === tabParam);
      if (foundTab) {
        setActiveTab(foundTab);
      }

      // Scroll to tabs section if tab parameter exists
      const scrollToTabs = () => {
        // Try using ref first
        if (tabsRef.current) {
          const elementTop = tabsRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - 80; // 80px offset from top
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback to ID selector
          const element = document.getElementById('feature-tabs');
          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementTop - 80;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      };

      // Multiple attempts to ensure scrolling works
      setTimeout(scrollToTabs, 100);
      setTimeout(scrollToTabs, 300);
      setTimeout(scrollToTabs, 600);
      setTimeout(scrollToTabs, 1000);
    }
  }, [tabParam]);

  // Handle scrolling on component mount for direct navigation
  useEffect(() => {
    if (tabParam) {
      const scrollOnMount = () => {
        // Try using ref first
        if (tabsRef.current) {
          const elementTop = tabsRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - 80;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback to ID selector
          const element = document.getElementById('feature-tabs');
          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementTop - 80;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      };

      // Wait for page to fully load before scrolling
      const timer = setTimeout(scrollOnMount, 1200);
      return () => clearTimeout(timer);
    }
  }, []); // Run only on mount

  const handleTabChange = (tab: typeof TABS[0]) => {
    if (tab.key === activeTab.key) return;
    setActiveTab(tab);
  };

  return (
    <section className="py-10 bg-transparent overflow-hidden">
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        {/* Tabs */}
        <motion.div
          id="feature-tabs"
          ref={tabsRef}
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
          className="flex justify-center mb-20 px-4 md:px-6 2xl:pl-50 mx-auto"
        >
          <motion.div
            className="grid grid-cols-2 gap-5 sm:flex sm:gap-4 rounded-full p-2"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {TABS.map((tab, index) => (
              <motion.button
                key={tab.key}
                variants={{
                  hidden: { y: 40, opacity: 0, scale: 0.9 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 120,
                      damping: 15
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(tab)}
                className={`rounded-full px-5 md:px-8 md:py-2 2xl:px-12 py-1 text-[17px] md:text-[20px] 2xl:text-[24px] font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95
                  ${activeTab.key === tab.key
                    ? "bg-[#960018] text-white shadow-lg"
                    : "bg-[#ffffff] text-black hover:bg-gray-400"
                  }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.key}
            initial={{ opacity: 0, x: 60, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -60, scale: 0.95, rotateY: -10 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1,
              delayChildren: 0.1
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-30 items-center"
          >
            {/* Phone Image */}
            <motion.div
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.15
                }}
                className="absolute inset-y-0
                left-1/2 -translate-x-1/2
                sm:left-1/2
                lg:left-0 lg:translate-x-0

                w-[90%]
                sm:w-[80%]
                md:w-130
                lg:w-105
                xl:w-130

                bg-[#202020]

                rounded-[40px]
                md:rounded-[60px]
                lg:rounded-r-[50px]
                lg:rounded-l-none"
              />
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="relative z-10 h-90 sm:h-110 xl:h-120 w-65 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activeTab.image}
                    alt={activeTab.label}
                    fill
                    className="object-contain drop-shadow-2xl py-10 2xl:pt-20"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
                staggerChildren: 0.1,
                delayChildren: 0.1
              }}
              className="px-4 md:px-6 md:pt-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.25
                }}
                className="text-3xl font-bold mb-6 text-white"
              >
                {activeTab.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.35
                }}
                className="text-2xl text-[#c3c3c3] leading-relaxed mb-8 tracking-wider"
              >
                {activeTab.description}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.45,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-[#960018] px-6 py-3 text-white font-semibold transform transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                Watch Video
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}