"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface StadiumCTAProps {
  filledPercentage?: number; // default 64
  joinedFans?: number; // default 48000
}

export default function WhyPeopleLoveFanith() {


  return (
    <section className="relative overflow-hidden pt-20 pb-26">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/Stadium_is_Filling_Fast.webp" // replace with your image
          alt="Stadium Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
          className="flex justify-center mt-6 mb-6"
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
        >
          {/* Gradient Border */}
          <span className="p-0.5">
            {/* Inner content */}
            <span className="block pb-3 text-md md:text-xl xl:text-[39px] font-bold text-white font-[Montserrat]/700">
              Why Fans Love Fanith
            </span>
          </span>
        </motion.div>
        <motion.div
          className="relative mx-auto max-w-5xl px-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        >
          <div className="
    relative
    rounded-2xl
    border border-[#FFFFFF]
    bg-[rgba(255, 255, 255, 0.05)]
    backdrop-blur-[7.050000190734863px]
    px-8 py-6
  ">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center items-stretch">

              {/* Item 1 */}
              <div className="flex flex-col items-center justify-center space-y-2 md:border-r-2 md:border-white/50 px-2 h-full">
                <p className="text-[#c3c3c3] tracking-wider flex justify-start items-center gap-2">
                  <span><img src="/assets/svg/one-big-star.svg" alt="Star" className="w-6 h-auto" /></span><span className="text-[22px]">4.8</span><span><img src="/assets/svg/5-star.svg" alt="Star" className="w-23 h-auto" /></span>
                </p>
                <p className="text-[#c3c3c3] text-md tracking-wider">App Store rating</p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center justify-center space-y-2 md:border-r-2 md:border-white/50 px-2 h-full">
                <div><img src="/assets/svg/watch-matches.svg" alt="Best place to watch matches together" className="w-11 h-full" /></div>
                <p className="text-[#c3c3c3] text-md tracking-wider">
                  Best place to watch matches together
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center justify-center space-y-2 md:border-r-2 md:border-white/50 px-2 h-full">
                <div><img src="/assets/svg/stats-and-chats.svg" alt="Stats + chat in one screen" className="w-11 h-full" /></div>
                <p className="text-[#c3c3c3] text-md tracking-wider">
                  Stats + chat in one screen
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center justify-center space-y-2 px-2 h-full">
                <div><img src="/assets/svg/watching-with-friends.svg" alt="Feels like watching with friends" className="w-11 h-full" /></div>
                <p className="text-[#c3c3c3] text-md tracking-wider">
                  Feels like watching with friends
                </p>
              </div>

            </div>
          </div>
        </motion.div>
        <motion.div 
          variants={{
            hidden: { y: 30, opacity: 0, scale: 0.9 },
            visible: { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 12
              } 
            }
          }}
          className="mt-7"
        >
          <div className="flex justify-center items-center gap-3">
            <span><a href="https://play.google.com/store/apps/details?id=com.fanithapp" rel="noopener noreferrer" target="_blank" className="href"><img src="/assets/images/Google-Play-Features.png" alt="Google Play Store" className="h-auto w-auto cursor-pointer" /></a></span>{" "}<span><img src="/assets/images/App-Store-Features.png" alt="App Store" className="h-auto w-auto cursor-pointer" /></span>
          </div>
        </motion.div>

    </section>
  );
}
