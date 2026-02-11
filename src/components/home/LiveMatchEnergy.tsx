"use client";

import { useRef, useState } from "react";
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
    desc: "Explore teams, players, and tournaments through structured stats and fan-powered insights. Fan Pedia brings clarity, context, and credibility to every match you follow.",
    points: ["Tribe Pedia — Team stats, rivalries, records", "Player Pedia — Player profiles, form, performance trends"],
    image: "/assets/images/Fan_Pedia.webp",
  },
  {
    title: "F Points - Play. Engage. Earn.",
    desc: "Earn F Points for everything you do — joining rooms, voting in polls, posting content, and supporting your tribe. Level up, unlock badges, and gain recognition in the community.",
    points: ["Points for participation", "Badges & levels", "Rewards & perks"],
    image: "/assets/images/F_Points.webp",
  },
  {
    title: "Fanboard - The Pulse of Fans",
    desc: "Scroll through memes, reactions, hot takes, and match-day emotions — all in one feed. Fanboard is where the community talks, reacts, and connects beyond the scoreboard.",
    points: ["Sports memes", "Fan posts & reactions", "Match-day buzz"],
    image: "/assets/images/Fanboard.webp",
  },
];

export default function LiveMatchEnergy() {
  const [index, setIndex] = useState(0);
  const leverRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  const slide = slides[index];

//   const onMouseDown = (e: React.MouseEvent) => {
//   startY.current = e.clientY;

//   const onMouseMove = (ev: MouseEvent) => {
//     const delta = ev.clientY - startY.current;

//     if (leverRef.current) {
//       leverRef.current.style.transform = `translateY(${Math.min(
//         delta,
//         120
//       )}px)`;
//     }

// const nextSlide = () => {
//   setIndex((prev) => (prev + 1) % slides.length);
// };


//     // Threshold crossed → next slide
//     if (delta > 100) {
//       nextSlide();
//       cleanup();
//     }
//   };

//   const cleanup = () => {
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseup", cleanup);

//     if (leverRef.current) {
//       leverRef.current.style.transform = "translateY(0)";
//     }
//   };

//   document.addEventListener("mousemove", onMouseMove);
//   document.addEventListener("mouseup", cleanup);
// };

const onMouseDown = (e: React.MouseEvent) => {
  startY.current = e.clientY;

  const trackHeight = 260; // same as lever height
  const knobHeight = 48;

  const onMouseMove = (ev: MouseEvent) => {
    const delta = ev.clientY - startY.current;
    const clamped = Math.max(0, Math.min(delta, trackHeight - knobHeight));

    if (leverRef.current) {
      leverRef.current.style.transform = `translate(-50%, ${clamped}px)`;
    }

    // 90% reached → change slide
    if (clamped >= (trackHeight - knobHeight) * 0.9) {
      setIndex((prev) => (prev + 1) % slides.length);
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", cleanup);

    if (leverRef.current) {
      leverRef.current.style.transition = "transform 0.3s ease";
      leverRef.current.style.transform = "translate(-50%, 0)";
    }
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", cleanup);
};


return (
  <section className="py-10 bg-[linear-gradient(121deg,rgba(158,29,29,0)_-23.79%,#0E0E0E_18.36%,#0E0E0E_79.09%,rgba(158,29,29,0)_124.81%)]">
    <div className="relative mx-auto max-w-7xl rounded-[35px] border-3 border-[#960018] text-white py-3 px-12 flex flex-col md:flex-row items-center gap-12">
    
    {/* LEFT CONTENT */}
    <div className="flex-1">
      <h2 className="text-4xl font-[Montserrat]/700 italic mb-4">
        {slide.title}
      </h2>

      <p className="text-[#c3c3c3] mb-6 max-w-xl">
        {slide.desc}
      </p>

      <ul className="space-y-2 mb-6">
        {slide.points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-sm">
            <span className="text-[#960018]">●</span> <span className="text-[#c3c3c3]">{p}</span>
          </li>
        ))}
      </ul>

      <button className="bg-[#960018] px-6 py-3 rounded-full text-sm">
        Watch Video
      </button>
    </div>

    {/* PHONE MOCKUP */}
    <div className="relative">
      <img
        src={slide.image}
        alt=""
        className="h-105"
      />
    </div>

    {/* LEVER */}
    <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-6 h-51 w-11 bg-[#202020] rounded-l-[19px] flex justify-center">
      <div
        ref={leverRef}
        onMouseDown={onMouseDown} 
        className="mt-5 ml-6 h-5 w-5 bg-[#960018] rounded-full cursor-pointer transition-transform overflow-visible" 
      />
    </div>
    {/* LEVER */}
{/* <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 translate-x-1/2 p-4 h-65 w-12 flex justify-center bg-[#202020] rounded-l-[30px]">
  TRACK
  <div className="relative h-full w-1.5 rounded-full overflow-visible">

    DRAG HANDLE
    <div
      ref={leverRef}
      onMouseDown={onMouseDown}
      className="absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer transition-transform z-10"
    >
      CIRCLE
      <img
        src="/assets/images/leverknob.png"
        alt="lever knob"
        className="w-10 h-10 select-none"
        draggable={false}
      />

      ARROW
      <img
        src="/assets/images/arrow_d.png"
        alt="arrow"
        className="w-6 mx-auto mt-1 opacity-80 select-none"
        draggable={false}
      />
    </div>
  </div>
</div> */}

  </div>
  </section>
);
}

