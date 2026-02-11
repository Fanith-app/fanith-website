"use client";

import { motion } from "framer-motion";
import EarlyAccess from "./EarlyAccess";

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
    <section className="relative overflow-hidden pb-13">
      {/* Bg- image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/Landing_Page_Banner.webp')" }}
      ></div>

      <div className="mx-auto px-4 md:px-10 py-20 pb-2">
        <div className="">

          {/* LEFT CONTENT */}
          <motion.div
            className="max-w-full"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="relative z-10 text-6xl md:text-3xl lg:text-3xl xl:text-5xl font-bold text-[#ffffff] leading-tight whitespace-normal lg:whitespace-nowrap wrap-break-word pt-10">
              <span className="text-[#960018]">One</span> Stadium.<br /> Millions of Fans. <br /><span className="text-[#960018]">One</span> Voice.
            </h1>

            <p className="relative z-10 mt-8 text-lg md:text-xl text-[#c3c3c3] leading-relaxed">
              Join live fan rooms, support your fan tribe, and experience matches together — in real time.
            </p>

            <EarlyAccess />

            {/* CTA BUTTONS */}
            {/* <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-4">
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
            </div> */}

            <p className="relative z-10 mt-0 text-md text-[#c3c3c3]">
              Early access + exclusive rewards for first 10K signups
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          {/* <motion.div
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
          </motion.div> */}

        </div>
      </div>
    </section>
  );
}
