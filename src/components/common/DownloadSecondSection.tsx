"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface OurStoryProps {
  title?: string;
  image: string;
}

export default function DownloadSecondSection({
  title = "Why Fans Love Fanith",
  image,
}: OurStoryProps) {
  return (
    <section className="bg-transparent py-10">
      <motion.div
        className="mx-auto max-w-7xl px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-50px" }}
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

        {/* Founder Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-40 items-center"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
              }
            }
          }}
        >
               {/* Image */}
        <motion.div
            className="relative h-130 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3
              }}
            >
              <Image src={image} alt="Founder" fill className="object-cover" />
            </motion.div>
          </motion.div>
          {/* Text */}
          <motion.div
            variants={{
              hidden: { y: 80, opacity: 0 },
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
              }}
            >
              <ul className="space-y-4 text-md md:text-xl xl:text-[25px] leading-relaxed text-[#c3c3c3] tracking-wider">
                <li className="flex items-center gap-3">
                    <img src="/assets/svg/right-arrrow.svg" className="w-5 h-5 mt-1" />
                    <span>Live fan rooms during matches</span>
                </li>
                <li className="flex items-center gap-3">
                    <img src="/assets/svg/right-arrrow.svg" className="w-5 h-5 mt-1" />
                    <span>Real-time chat & reactions</span>
                </li>
                <li className="flex items-center gap-3">
                    <img src="/assets/svg/right-arrrow.svg" className="w-5 h-5 mt-1" />
                    <span>Match stats alongside discussion</span>
                </li>
                <li className="flex items-center gap-3">
                    <img src="/assets/svg/right-arrrow.svg" className="w-5 h-5 mt-1" />
                    <span>Memes, clips, and moments instantly</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Pill Heading */}
        <motion.div
          className="flex justify-center mt-12 mb-6"
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
            <span className="block px-20 py-3 text-md md:text-xl xl:text-[32px] font-bold text-white font-[Montserrat]/700">
              {title}
            </span>
          </span>
        </motion.div>

        {/* Story Text */}
        {/* <motion.div
          className="text-center text-md md:text-xl xl:text-[21px] leading-relaxed text-[#c3c3c3] mb-24 tracking-wider"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }
            }
          }}
        >
          
        </motion.div> */}
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
    border border-[rgba(238,238,238,0.18)]
    bg-[linear-gradient(121deg,#9e1d1d_-44.24%,#202020_17.35%,#202020_82.46%,#9e1d1d_138.78%)]
    backdrop-blur-[2px]
    px-8 py-6
  ">
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center">

      {/* Item 1 */}
      <div className="flex flex-col items-center justify-center space-y-2 md:border-r md:border-white/10 px-2">
        {/* <div className="text-yellow-400 text-2xl">⭐</div> */}
        {/* <p className="text-white font-semibold text-lg"><span></span>4.8 ★★★★★</p> */}
        <p className="text-[#c3c3c3] tracking-wider flex justify-start items-center gap-2">
              <span><img src="/assets/svg/one-big-star.svg" alt="Star" className="w-6 h-auto" /></span><span className="text-[22px]">4.8</span><span><img src="/assets/svg/5-star.svg" alt="Star" className="w-23 h-auto" /></span>
            </p>
        <p className="text-[#c3c3c3] text-md tracking-wider">App Store rating</p>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col items-center justify-center space-y-2 md:border-r md:border-white/10 px-2">
        <div><img src="/assets/svg/watch-matches.svg" alt="Best place to watch matches together" className="w-11 h-full" /></div>
        <p className="text-[#c3c3c3] text-md tracking-wider">
          Best place to watch matches together
        </p>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col items-center justify-center space-y-2 md:border-r md:border-white/10 px-2">
        <div><img src="/assets/svg/stats-and-chats.svg" alt="Stats + chat in one screen" className="w-11 h-full" /></div>
        <p className="text-[#c3c3c3] text-md tracking-wider">
          Stats + chat in one screen
        </p>
      </div>

      {/* Item 4 */}
      <div className="flex flex-col items-center justify-center space-y-2 px-2">
        <div><img src="/assets/svg/watching-with-friends.svg" alt="Feels like watching with friends" className="w-11 h-full" /></div>
        <p className="text-[#c3c3c3] text-md tracking-wider">
          Feels like watching with friends
        </p>
      </div>

    </div>
  </div>
</motion.div>

      </motion.div>
    </section>
  );
}
