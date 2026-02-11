"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import VisionMission from "./common/VisionMission";

interface OurStoryProps {
  title?: string;
  storyText: string;
  founderTitle: string;
  founderMessage: string;
  image: string;
}

export default function OurStory({
  title = "Our Story",
  storyText,
  founderTitle,
  founderMessage,
  image,
}: OurStoryProps) {
  return (
    <section className="bg-transparent py-20">
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
        {/* Pill Heading */}
        <motion.div
          className="flex justify-center mb-12"
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
            <span className="block px-20 py-3 text-md md:text-xl xl:text-[32px] font-bold text-white">
              {title}
            </span>
          </span>
        </motion.div>

        {/* Story Text */}
        <motion.p
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
          {storyText}
        </motion.p>

        <VisionMission
                items={[
                  {
                    title: "Our Vision",
                    description:
                      "To build the world's most engaging digital community for sports fans — where passion, connection, and excitement come alive.",
                    icon: "/assets/images/vision-icon.png",
                  },
                  {
                    title: "Our Mission",
                    description:
                      "To empower fans with real-time engagement tools, community-driven content, and features that transform the way people experience sports digitally.",
                    icon: "/assets/images/mission-icon.png",
                  },
                ]}
              />

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
            <motion.h3
              className="text-md md:text-xl xl:text-[32px] font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
            >
              {founderTitle}
            </motion.h3>

            <motion.p
              className="text-md md:text-xl xl:text-[21px] leading-relaxed text-[#c3c3c3] tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
              }}
            >
              {founderMessage}
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-90 w-full "
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
              <Image src={image} alt="Founder" fill className="object-cover rounded-xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
