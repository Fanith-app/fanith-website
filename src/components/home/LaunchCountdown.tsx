"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-03-01T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  function getTimeLeft(): TimeLeft {
    const now = new Date().getTime();
    const distance = TARGET_DATE.getTime() - now;

    return {
      days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((distance / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((distance / (1000 * 60)) % 60), 0),
      seconds: Math.max(Math.floor((distance / 1000) % 60), 0),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white py-14 sm:py-20">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-35 text-center"
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
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
      >

        {/* Heading */}
        <motion.h2
          variants={{
            hidden: { y: 50, opacity: 0, scale: 0.95 },
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
          className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-black"
        >
          Launching before IPL 2026 – Get Ready!
        </motion.h2>

        <motion.p
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
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-700"
        >
          Your Stadium Seat Awaits — March 1, 2026
        </motion.p>

        {/* Timer Grid */}
        <motion.div
          className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 place-items-center"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.3
              } 
            }
          }}
        >
          <TimerBox label="Days" value={timeLeft.days} />
          <TimerBox label="Hours" value={timeLeft.hours} />
          <TimerBox label="Minutes" value={timeLeft.minutes} />
          <TimerBox label="Seconds" value={timeLeft.seconds} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================= SEVEN SEGMENT DIGIT ================= */

function SevenSegmentDigit({ digit }: { digit: number }) {
  const map: Record<number, number[]> = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1],
  };

  const seg = map[digit];

  const positions = [
    "top",
    "top-right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "top-left",
    "middle",
  ];

  return (
    <div className="relative w-[40px] h-[68px] sm:w-[46px] sm:h-[78px] sclae-65">
      {positions.map((pos, i) => (
        <span key={i} className={`segment ${pos} ${seg[i] ? "on" : ""}`} />
      ))}
    </div>
  );
}

/* ================= TIMER BOX ================= */

function TimerBox({ label, value }: { label: string; value: number }) {
  const digits = String(value).padStart(2, "0").split("").map(Number);

  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0, scale: 0.9, rotateX: 15 },
        visible: { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotateX: 0,
          transition: { 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          } 
        }
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="
        relative
        w-[clamp(110px,22vw,150px)]
        h-[clamp(110px,22vw,150px)]
        rounded-xl
        bg-linear-to-r from-[#303338] via-[#87909E] to-[#303338]
        p-[2px] sm:p-[3px]
        shadow-[0_30px_60px_-30px_#000000]
        cursor-pointer
      "
    >
      <div
        className="
          w-full h-full
          rounded-xl
          bg-[#0b0b0d]
          flex flex-col items-center justify-center
          relative
        "
      >
        {/* Glass shine */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-b from-white/10 to-transparent pointer-events-none" />

        {/* Label */}
        <span className="absolute top-2 sm:top-3 text-white text-xs sm:text-sm md:text-base italic">
          {label}
        </span>

        {/* Digits */}
        <div className="flex gap-1 sm:gap-2 mt-5 sm:mt-6 scale-[0.6] sm:scale-[0.7] md:scale-[0.8]">
          {digits.map((d, i) => (
            <SevenSegmentDigit key={i} digit={d} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}


