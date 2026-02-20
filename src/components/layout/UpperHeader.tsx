// components/CountdownBanner.tsx
'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UpperHeader = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate target date (IPL 2026 start)
    const targetDate = new Date('2026-03-01T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <>
      <style jsx>{`
        .countdown-banner {
          width: 100%;
          background: #202020;
          display: none;
        }
        
        /* Hide on medium screens and above */
        @media (min-width: 768px) {
          .countdown-banner {
            display: block !important;
          }
        }
        
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0.3rem 0rem 0.3rem 2rem;
        }
        
        .content-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        
        .title {
          color: white;
          font-weight: 700;
          text-align: center;
          margin: 0;
        }
        
        .timer-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .timer-block {
          display: flex;
          flex-direction: row;
          align-items: baseline;
        }
        
        .timer-number {
          line-height: 1.2;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .timer-label {
          color: #F2F2F2;
          letter-spacing: 0.05em;
          margin-top: 0.125rem;
          font-weight: 400;
        }
        
        .separator {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        /* Animation */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="countdown-banner">
        <div className="container">
          <div className="content-wrapper">
            <div className='title-div'>
              <h2 className="title text-sm lg:text-lg italic font-[Neometric]/700">
              Launching before IPL 2026 — Get Ready!
            </h2>
            </div>
            
            <div className="timer-wrapper bg-black py-1 px-20 drop-shadow-[0_0_5.5px_rgba(0,0,0,0.25)] [clip-path:polygon(5%_0%,100%_0%,100%_100%,0%_100%)]">
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Days
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Hours
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Minutes
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperHeader;




// "use client";

// import { useEffect, useState } from "react";

// const TARGET_DATE = new Date("2026-03-01T00:00:00");

// interface TimeLeft {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// export default function UpperHeader() {
//   const [time, setTime] = useState<TimeLeft>(getTimeLeft());

//   function getTimeLeft() {
//     const diff = TARGET_DATE.getTime() - Date.now();

//     return {
//       days: Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0),
//       hours: Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0),
//       minutes: Math.max(Math.floor((diff / (1000 * 60)) % 60), 0),
//       seconds: Math.max(Math.floor((diff / 1000) % 60), 0),
//     };
//   }

//   useEffect(() => {
//     const i = setInterval(() => setTime(getTimeLeft()), 1000);
//     return () => clearInterval(i);
//   }, []);

//   return (
//     <div className="hidden md:flex w-full bg-[#202020] text-white px-3 py-1.5 items-center justify-around">
      
//       LEFT TEXT
//       <div className="text-lg font-extrabold italic font-[Neometric]/700">
//         Launching before IPL 2026 – Get Ready!
//       </div>

//       RIGHT TIMER
//       <div className="flex items-center gap-10 bg-black py-1 px-10 drop-shadow-[0_0_5.5px_rgba(0,0,0,0.25)] [clip-path:polygon(5%_0%,100%_0%,100%_100%,0%_100%)]">
//         <TimerItem value={time.days} label="Days" />
//         <TimerItem value={time.hours} label="Hours" />
//         <TimerItem value={time.minutes} label="Minutes" />
//         <TimerItem value={time.seconds} label="Seconds" />
//       </div>
//     </div>
//   );
// }

// function SevenSegmentDigit({ digit }: { digit: number }) {
//   const map: Record<number, number[]> = {
//     0: [1,1,1,1,1,1,0],
//     1: [0,1,1,0,0,0,0],
//     2: [1,1,0,1,1,0,1],
//     3: [1,1,1,1,0,0,1],
//     4: [0,1,1,0,0,1,1],
//     5: [1,0,1,1,0,1,1],
//     6: [1,0,1,1,1,1,1],
//     7: [1,1,1,0,0,0,0],
//     8: [1,1,1,1,1,1,1],
//     9: [1,1,1,1,0,1,1],
//   };

//   const seg = map[digit];
//   const positions = ["top","top-right","bottom-right","bottom","bottom-left","top-left","middle"];

//   return (
//     <div className="relative w-10 h-16">
//       {positions.map((pos, i) => (
//         <span key={i} className={`segment ${pos} ${seg[i] ? "on" : ""}`} />
//       ))}
//     </div>
//   );
// }

// /* ===== TIMER ITEM ===== */

// function TimerItem({ value, label }: { value: number; label: string }) {
//     const digits = String(value).padStart(2, "0").split("").map(Number);
//   return (
//     <div className="flex items-end-safe gap-0.5">
//       <div className="flex justify-center items-center gap-3.5 scale-[0.51] text-md tracking-widest font-[Technology]/700 text-[#FC8068]
//   italic
//   font-normal
//   leading-relaxed bg-linear-to-b from-white/10 to-transparent">
//         {digits.map((d, i) => (
//           <SevenSegmentDigit key={i} digit={d} />
//         ))}
//       </div>
//       {/* <div className="absolute inset-0 rounded-xl bg-linear-to-b from-white/10 to-transparent pointer-events-none" /> */}
//       <span className="text-sm opacity-80 whitespace-nowrap
//   text-[#FFFFFF]
//   text-left
//   font-kanit
//   italic
//   font-normal
//   leading-relaxed">{label}</span>
//     </div>
//   );
// }
