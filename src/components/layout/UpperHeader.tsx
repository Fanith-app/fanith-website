"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-03-01T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function UpperHeader() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  function getTimeLeft() {
    const diff = TARGET_DATE.getTime() - Date.now();

    return {
      days: Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((diff / (1000 * 60)) % 60), 0),
      seconds: Math.max(Math.floor((diff / 1000) % 60), 0),
    };
  }

  useEffect(() => {
    const i = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="hidden md:flex w-full bg-[#202020] text-white px-3 py-1.5 items-center justify-around">
      
      {/* LEFT TEXT */}
      <div className="text-lg font-extrabold italic font-[Neometric]/700">
        Launching before IPL 2026 – Get Ready!
      </div>

      {/* RIGHT TIMER */}
      <div className="flex items-center gap-10 bg-black py-1 px-10 drop-shadow-[0_0_5.5px_rgba(0,0,0,0.25)] [clip-path:polygon(5%_0%,100%_0%,100%_100%,0%_100%)]">
        <TimerItem value={time.days} label="Days" />
        <TimerItem value={time.hours} label="Hours" />
        <TimerItem value={time.minutes} label="Minutes" />
        <TimerItem value={time.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function SevenSegmentDigit({ digit }: { digit: number }) {
  const map: Record<number, number[]> = {
    0: [1,1,1,1,1,1,0],
    1: [0,1,1,0,0,0,0],
    2: [1,1,0,1,1,0,1],
    3: [1,1,1,1,0,0,1],
    4: [0,1,1,0,0,1,1],
    5: [1,0,1,1,0,1,1],
    6: [1,0,1,1,1,1,1],
    7: [1,1,1,0,0,0,0],
    8: [1,1,1,1,1,1,1],
    9: [1,1,1,1,0,1,1],
  };

  const seg = map[digit];
  const positions = ["top","top-right","bottom-right","bottom","bottom-left","top-left","middle"];

  return (
    <div className="relative w-10 h-16">
      {positions.map((pos, i) => (
        <span key={i} className={`segment ${pos} ${seg[i] ? "on" : ""}`} />
      ))}
    </div>
  );
}

/* ===== TIMER ITEM ===== */

function TimerItem({ value, label }: { value: number; label: string }) {
    const digits = String(value).padStart(2, "0").split("").map(Number);
  return (
    <div className="flex items-end-safe gap-0.5">
      <div className="flex justify-center items-center gap-3.5 scale-[0.51] text-md tracking-widest font-[Technology]/700 text-[#FC8068]
  italic
  font-normal
  leading-relaxed bg-linear-to-b from-white/10 to-transparent">
        {digits.map((d, i) => (
          <SevenSegmentDigit key={i} digit={d} />
        ))}
      </div>
      {/* <div className="absolute inset-0 rounded-xl bg-linear-to-b from-white/10 to-transparent pointer-events-none" /> */}
      <span className="text-sm opacity-80 whitespace-nowrap
  text-[#FFFFFF]
  text-left
  font-kanit
  italic
  font-normal
  leading-relaxed">{label}</span>
    </div>
  );
}
