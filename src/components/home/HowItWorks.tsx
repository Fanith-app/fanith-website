"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Friendly Banters",
    description:
      "React, tease, and celebrate with rival fans",
    icon: "/assets/images/friendly-banters.webp",
  },
  {
    title: "Sports Memes",
    description:
      "Share match memes the moment it happens.",
    icon: "/assets/images/sports-memes.webp",
  },
  {
    title: "Media Sharing",
    description:
      "React, tease, and celebrate with rival fans",
    icon: "/assets/images/media-sharing.webp",
  },
  {
    title: "Analytics Stats",
    description:
      "Break down matches with real-time data.",
    icon: "/assets/images/analytics-stats.webp",
  },
  {
    title: "Earn Badges",
    description:
      "Build your FanDom score and unlock rewards.",
    icon: "/assets/images/earn-badges.webp",
  },
];

export default function HowItWorks() {
const VISIBLE_DESKTOP = 3;
const VISIBLE_TABLET = 2;
const VISIBLE_MOBILE = 1;

const [index, setIndex] = useState(VISIBLE_DESKTOP);
const [isAnimating, setIsAnimating] = useState(true);
const clonedSlides = [
  ...steps.slice(-VISIBLE_DESKTOP),
  ...steps,
  ...steps.slice(0, VISIBLE_DESKTOP),
];
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => prev + 1);
    setIsAnimating(true);
  }, 5000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (index === steps.length + VISIBLE_DESKTOP) {
    setTimeout(() => {
      setIsAnimating(false);
      setIndex(VISIBLE_DESKTOP);
    }, 800);
  }

  if (index === 0) {
    setTimeout(() => {
      setIsAnimating(false);
      setIndex(steps.length);
    }, 800);
  }
}, [index]);
  return (
    <section className="py-20">
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
          className="text-center text-4xl font-bold text-white mb-3"
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
          What you can do
        </motion.h2>
        <motion.p
          className="text-center text-[#c3c3c3]/90 text-[20px] font-bold mb-14"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1, 
              transition: { 
                duration: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              } 
            }
          }}
        >
          Everything fans do during a match — now in one place.
        </motion.p>

        {/* Cards */}
        {/* <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
              }
            }
          }}
        >
          {steps.map((step, index) => {

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { y: 60, opacity: 0, scale: 0.8, rotateY: 15 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
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
                rotateY: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              >
                <Card
                  className="group relative rounded-none border-none bg-[#202020] shadow-[0_8px_14px_-10px_#000000] transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  <Image 
                    src="/assets/images/7063 1.png" 
                    alt="bg-img" 
                    fill 
                    className="object-cover opacity-70 rounded-3xl transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <CardContent className="flex flex-col items-center text-center text-[#FFFFFF]">

                    Icon Circle
                    <motion.div
                      className="mb-6 relative h-56 w-full overflow-hidden -mt-6 shadow-lg"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    >
                      <Image
                        src={step.icon}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-semibold mb-4 transform transition-all duration-500 group-hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      className="text-base text-white/90 leading-relaxed transform transition-all duration-500 group-hover:text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      {step.description}
                    </motion.p>
                  </CardContent>

                  Hover Glow Effect
                  <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div> */}
        {/* CAROUSEL */}
{/* CAROUSEL */}
<div className="relative overflow-hidden">

  {/* ARROWS (SINGLE PLACE) */}
  <button
    onClick={() => {
      setIsAnimating(true);
      setIndex((prev) => prev - 1);
    }}
    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white text-3xl px-4 bg-[#960018] w-10 h-10 rounded-full"
  >
    ‹
  </button>

  <button
    onClick={() => {
      setIsAnimating(true);
      setIndex((prev) => prev + 1);
    }}
    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white text-3xl px-4 bg-[#960018] w-10 h-10 rounded-full"
  >
    ›
  </button>

  {/* TRACK */}
  <div className="overflow-hidden">
    <motion.div
      className="flex"
      animate={{
        x: `-${index * (100 / VISIBLE_DESKTOP)}%`,
      }}
      transition={
        isAnimating
          ? { duration: 0.8, ease: "easeInOut" }
          : { duration: 0 }
      }
    >
      {clonedSlides.map((step, i) => (
        <div
          key={i}
          className="
            shrink-0
            w-full
            sm:w-1/2
            md:w-1/3
            px-3
          "
        >
          {/* <Card className="bg-[#202020] border-none rounded-none h-full">
            <div className="relative h-56 w-full">
              <Image
                src={step.icon}
                alt={step.title}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="text-center text-white py-6">
              <h3 className="text-2xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-white/80">
                {step.description}
              </p>
            </CardContent>
          </Card> */}
          <Card className="relative bg-[#1e1e1e] border border-white/20 rounded-none overflow-hidden h-full [clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]
">

  {/* CATEGORY TAG */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-xl">
    <div className="bg-black text-center text-white text-lg font-semibold px-4 py-2 clip-tag">
      {step.title}
    </div>
  </div>

  {/* IMAGE WRAPPER */}
  <div className="relative h-64 w-full clip-card-img overflow-hidden">
    <Image
      src={step.icon}
      alt={step.title}
      fill
      priority={false}
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  </div>

  {/* CONTENT */}
  <CardContent className="text-center text-white px-6 py-6">
    <p className="text-base text-white/85 leading-relaxed">
      {step.description}
    </p>
  </CardContent>
</Card>

        </div>
      ))}
    </motion.div>
  </div>
</div>


      </motion.div>
    </section>
  );
}
