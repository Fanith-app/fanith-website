"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import EarlyAccessModal from "../modals/EarlyAccessModal";
import { useState } from "react";
import { Button } from "../ui/button";

interface StadiumCTAProps {
  filledPercentage?: number; // default 64
  joinedFans?: number; // default 48000
}

export default function StadiumCTA({
  filledPercentage = 64,
  joinedFans = 48000,
}: StadiumCTAProps) {

  
  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.getElementById('early-access');
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/stadium.png" // replace with your image
          alt="Stadium Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        className="mx-auto max-w-5xl px-4 md:px-6 py-24 text-center text-[#FFFFFF]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-100px" }}
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

        <motion.h2
          variants={{
            hidden: { y: 60, opacity: 0, scale: 0.9 },
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
          className="text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-extrabold"
        >
          The Stadium is Filling Fast – Grab Your Seat!
        </motion.h2>

        <motion.p
          variants={{
            hidden: { y: 40, opacity: 0 },
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
          className="mt-5 text-base md:text-lg lg:text-2xl font-bold text-[#FFFFFF]"
        >
          {joinedFans.toLocaleString()} fans have already joined the Fanith tribe.
          Be part of the roar.
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          variants={{
            hidden: { y: 40, opacity: 0, scale: 0.95 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
              }
            }
          }}
          className="mt-10"
        >
          <div className="mx-auto h-4 max-w-xl rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-[#8F231B] to-[#C83228]"
              initial={{ width: 0 }}
              whileInView={{ width: `${filledPercentage}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-3 text-lg font-semibold"
          >
            Stadium Fill: {filledPercentage}%
          </motion.p>
        </motion.div>

        {/* CTA Button */}
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
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 12
              }
            }
          }}
          className="mt-8"
        >
          <Button
            onClick={scrollToEarlyAccess}
          className="inline-flex items-center justify-center rounded-full bg-[#9E1F16] px-8 py-3 text-base font-semibold transform transition-all duration-300 ease-in-out hover:bg-[#b3261c] hover:scale-105 cursor-pointer"
          >
            Secure My Seat Now →
          </Button>
        </motion.div>

      </motion.div>
     
    </section>
  );
}
