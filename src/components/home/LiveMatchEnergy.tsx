
// New -------------> 24-02-2026 (Yeh perfect hai, sirf isme mobile mein horizontal scrolling nahi hai)
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Fan Room - Live Match Energy",
    desc:
      "Join live game rooms during matches. Chat in real time, react instantly, vote in polls, and experience every moment with fans who feel it just like you do.",
    points: [
      "Live match rooms",
      "Real-time chat & reactions",
      "In-match polls & moments",
    ],
    image: "/assets/images/Fan_Room.webp",
  },
  {
    title: "Fan Pedia - Knowledge by Fans",
    desc:
      "Explore teams, players, and tournaments through structured stats and fan-powered insights.",
    points: ["Team stats & rivalries", "Player performance trends"],
    image: "/assets/images/Fan_Pedia.webp",
  },
  {
    title: "F Points - Play. Engage. Earn.",
    desc:
      "Earn F Points for everything you do — joining rooms, voting in polls, posting content.",
    points: ["Points for participation", "Badges & levels", "Rewards & perks"],
    image: "/assets/images/F_Points.webp",
  },
  {
    title: "Fanboard - The Pulse of Fans",
    desc:
      "Scroll through memes, reactions, hot takes, and match-day emotions.",
    points: ["Sports memes", "Fan posts", "Match-day buzz"],
    image: "/assets/images/Fanboard.webp",
  },
];

export default function LiveMatchEnergy() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) -
        Math.max(rect.top, 0);

      const isMostlyVisible =
        visibleHeight >= window.innerHeight * 0.9;

      if (!isMostlyVisible) return;
      if (isAnimating.current) return;

      if (e.deltaY > 0 && index < slides.length - 1) {
        e.preventDefault();
        isAnimating.current = true;
        setIndex((prev) => prev + 1);
      }

      if (e.deltaY < 0 && index > 0) {
        e.preventDefault();
        isAnimating.current = true;
        setIndex((prev) => prev - 1);
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () =>
      window.removeEventListener("wheel", handleWheel);
  }, [index]);

  const slide = slides[index];

  return (
    
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[linear-gradient(121deg,rgba(158,29,29,0)_-23.79%,#0E0E0E_18.36%,#0E0E0E_79.09%,rgba(158,29,29,0)_124.81%)]"
    >
      <div className="max-w-7xl mx-auto w-full px-6">

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          {/* LEFT */}
          <div className="flex-1 text-white">
            <h2 className="text-3xl md:text-5xl font-bold italic mb-6">
              {slide.title}
            </h2>

            <p className="text-gray-300 text-xl/relaxed mb-6 max-w-xl">
              {slide.desc}
            </p>

            <ul className="space-y-3 mb-8">
              {slide.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm md:text-lg">
                  <span className="text-[#960018]">●</span>
                  <span className="text-gray-300">{p}</span>
                </li>
              ))}
            </ul>

            <button className="bg-[#960018] px-6 py-3 rounded-full hover:bg-red-700 transition">
              Watch Video
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <motion.img
              key={slide.image}
              src={slide.image}
              alt="slide"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-h-130 w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>

      
      <div className="hidden md:flex absolute right-14 top-1/2 -translate-y-1/2 flex-col gap-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 transition"
          >
            {i === index && (
              <motion.div
                layoutId="activeBall"
                className="absolute inset-0 rounded-full bg-[#960018] shadow-md shadow-red-900/50"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}



// New --------> till 23rd 2026 (Jise change kar sakte hain but iske height mein issue hai)
// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// const slides = [
//   {
//     title: "Fan Room - Live Match Energy",
//     desc:
//       "Join live game rooms during matches. Chat in real time, react instantly, vote in polls, and experience every moment with fans who feel it just like you do.",
//     points: [
//       "Live match rooms",
//       "Real-time chat & reactions",
//       "In-match polls & moments",
//     ],
//     image: "/assets/images/Fan_Room.webp",
//   },
//   {
//     title: "Fan Pedia - Knowledge by Fans",
//     desc:
//       "Explore teams, players, and tournaments through structured stats and fan-powered insights.",
//     points: ["Team stats & rivalries", "Player performance trends"],
//     image: "/assets/images/Fan_Pedia.webp",
//   },
//   {
//     title: "F Points - Play. Engage. Earn.",
//     desc:
//       "Earn F Points for everything you do — joining rooms, voting in polls, posting content.",
//     points: ["Points for participation", "Badges & levels", "Rewards & perks"],
//     image: "/assets/images/F_Points.webp",
//   },
//   {
//     title: "Fanboard - The Pulse of Fans",
//     desc:
//       "Scroll through memes, reactions, hot takes, and match-day emotions.",
//     points: ["Sports memes", "Fan posts", "Match-day buzz"],
//     image: "/assets/images/Fanboard.webp",
//   },
// ];

// export default function LiveMatchEnergy() {
//   const [index, setIndex] = useState(0);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const isAnimating = useRef(false);

//   Scroll based slide change
//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       if (!sectionRef.current) return;

//       const rect = sectionRef.current.getBoundingClientRect();
//       const isInView =
//         rect.top <= 0 && rect.bottom >= window.innerHeight;

//       if (!isInView) return;

//       if (
//         (e.deltaY > 0 && index < slides.length - 1) ||
//         (e.deltaY < 0 && index > 0)
//       ) {
//         e.preventDefault();
//       }

//       if (isAnimating.current) return;

//       if (e.deltaY > 0 && index < slides.length - 1) {
//         isAnimating.current = true;
//         setIndex((prev) => prev + 1);
//       }

//       if (e.deltaY < 0 && index > 0) {
//         isAnimating.current = true;
//         setIndex((prev) => prev - 1);
//       }

//       setTimeout(() => {
//         isAnimating.current = false;
//       }, 700);
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//     };
//   }, [index]);

//   const slide = slides[index];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-[linear-gradient(121deg,rgba(158,29,29,0)_-23.79%,#0E0E0E_18.36%,#0E0E0E_79.09%,rgba(158,29,29,0)_124.81%)] h-auto"
//     >
//       <div className="flex items-center max-w-7xl mx-auto px-6 py-10 sticky top-0 h-auto justify-center overflow-hidden">

//         MAIN CONTENT
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 80 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col md:flex-row items-center gap-12 w-full"
//         >
//           LEFT
//           <div className="flex-1 text-white">
//             <h2 className="text-3xl md:text-5xl font-bold italic mb-6">
//               {slide.title}
//             </h2>

//             <p className="text-gray-300 text-xl/relaxed mb-6 max-w-xl ">
//               {slide.desc}
//             </p>

//             <ul className="space-y-3 mb-8 text-lg">
//               {slide.points.map((p) => (
//                 <li key={p} className="flex gap-3 text-sm md:text-lg">
//                   <span className="text-[#960018]">●</span>
//                   <span className="text-gray-300">{p}</span>
//                 </li>
//               ))}
//             </ul>

//             <button className="bg-[#960018] px-6 py-3 rounded-full text-base hover:bg-red-700 transition">
//               Watch Video
//             </button>
//           </div>

//           RIGHT IMAGE
//           <div className="flex-1 flex justify-center">
//             <motion.img
//               key={slide.image}
//               src={slide.image}
//               alt="slide"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="max-h-112.5 md:max-h-137.5 w-auto object-contain"
//             />
//           </div>
//         </motion.div>

//         PREMIUM RIGHT SIDE INDICATOR (DESKTOP ONLY)
//         <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2">

//           <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-4 py-6 shadow-xl flex flex-col gap-5">

//             {slides.map((_, i) => {
//               const isActive = i === index;

//               return (
//                 <motion.button
//                   key={i}
//                   onClick={() => setIndex(i)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`relative h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 ${
//                     isActive
//                       ? "bg-[#960018] text-white shadow-lg shadow-red-900/40"
//                       : "bg-white/5 text-gray-400 hover:bg-white/10"
//                   }`}
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeIndicator"
//                       className="absolute inset-0 rounded-lg bg-[#960018]"
//                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                     />
//                   )}

//                   <span className="relative z-10">{i + 1}</span>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }