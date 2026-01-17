"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import EarlyAccessModal from "../modals/EarlyAccessModal";

export default function HomeBanner() {

  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.getElementById('early-access');
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJoinBeta = () => {
    scrollToEarlyAccess();
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#f5f0f0] via-[#f8efec] to-[#fde7e2]">
      {/* Bg- image */}
      <div
        className="absolute top-20 right-8 w-60 h-60 hidden lg:block bg-no-repeat bg-contain bg-dots-1024-600"
        style={{
          backgroundImage: `url('/assets/svg/Group 732.svg')`
        }}
      ></div>

      <div className="mmx-auto px-4 md:px-10 py-20 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.3fr] items-start">

          {/* LEFT CONTENT */}
          <motion.div
            className="max-w-xl"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#000000] leading-tight whitespace-normal lg:whitespace-nowrap wrap-break-word">
              WHERE FANS BECOME LEGENDS
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[#333333] leading-relaxed">
              Join live game rooms, earn FanDom points, and celebrate every match with your tribe. Experience the ultimate sports fan platform built for passion.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleJoinBeta}
                variant="gradient"
                size="xl"
                className="cursor-pointer"
              >
                Join Beta
              </Button>

              <Button
                asChild
                variant="dark"
                size="xl"
              >
                <Button className="cursor-pointer">
                  Watch Teaser
                </Button>
              </Button>
            </div>

            <p className="mt-6 text-md text-[#555555]">
              Early access + exclusive rewards for first 10K signups
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative flex justify-center lg:justify-end items-center -mt-12 md:-mt-15 lg:-mt-40"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full flex justify-center md:justify-center lg:justify-end">
              <div className="relative h-95 w-[320px] md:h-125 md:w-125 lg:h-175 lg:w-175 tablet-1024-600">
                <Image
                  src="/assets/images/mobileImage.png"
                  alt="Fanith App Screen"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
