"use client";

import { motion } from "framer-motion";

export default function HomeBanner() {
  return (
    <section className="w-full">

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          className="relative w-full flex items-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          {/* Background Image */}
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/Landing_Page_Banner.webp')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 -z-10" />

          {/* Content */}
          <div className="relative z-10 px-4 md:px-10 py-20">

            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight whitespace-normal lg:whitespace-nowrap">
              <span className="text-[#960018]">One</span> Stadium.
              <br />
              Millions of Fans.
              <br />
              <span className="text-[#960018]">One</span> Voice.
            </h1>

            <p className="mt-8 text-lg md:text-2xl text-[#c3c3c3] leading-relaxed tracking-wider">
              Join live fan rooms, support your fan tribe, and <br />
              experience matches together — in real time.
            </p>

            {/* STORE BUTTONS */}
            <div className="flex gap-3 pt-5 pb-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.fanithapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/Google-Play-Features.png"
                  alt="Google Play"
                  className="h-auto w-auto cursor-pointer"
                />
              </a>

              <a
                href="https://apps.apple.com/in/app/fanith/id6760101126"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/App-Store-Features.png"
                  alt="App Store"
                  className="h-auto w-auto cursor-pointer"
                />
              </a>
            </div>

            {/* RATINGS */}
            <p className="mt-2 text-[#c3c3c3] flex items-center gap-2">
              <img src="/assets/svg/one-big-star.svg" className="w-6 h-6" />
              <span className="text-[22px]">4.8</span>
              <img src="/assets/svg/5-star.svg" className="w-23 h-auto" />
              <img src="/assets/svg/mobile.svg" className="w-5 h-5" />
              <span className="text-[20px]">
                Available on Android & iOS
              </span>
            </p>

            {/* USERS */}
            <p className="mt-1 text-[#c3c3c3] flex items-center gap-2">
              <img src="/assets/svg/fans-joined.svg" />
              <span className="text-xl">50,000+ fans joined</span>
            </p>

          </div>
        </motion.div>

        {/* RIGHT VIDEO */}
        <motion.div
          className="w-full h-full"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/assets/videos/Welcome-To-Fanith.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

      </div>

    </section>
  );
}



















// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function HomeBanner() {
//   const [videoLoaded, setVideoLoaded] = useState(false);

//   const scrollToEarlyAccess = () => {
//     const earlyAccessSection = document.getElementById('early-access');
//     if (earlyAccessSection) {
//       earlyAccessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <section className="relative w-full overflow-hidden pb-13 h-auto">
//       FALLBACK IMAGE
//       {!videoLoaded && (
//         <div
//           className="absolute inset-0 bg-cover bg-center z-0"
//           style={{
//             backgroundImage: "url('/assets/images/Landing_Page_Banner.webp')",
//           }}
//         />
//       )}
//       VIDEO BACKGROUND
//       <video
//         className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
//           videoLoaded ? "opacity-100" : "opacity-0"
//         }`}
//         autoPlay
//         muted
//         loop
//         playsInline
//         onCanPlayThrough={() => setVideoLoaded(true)}
//       >
//         <source src="/assets/videos/Welcome-To-Fanith.mp4" type="video/mp4" />
//       </video>

//       DARK OVERLAY
//       <div className="absolute inset-0 bg-black/50 z-10" />

//       <div className="mx-auto px-4 md:px-10 py-20 pb-2">
//         <div className="">

//           LEFT CONTENT
//           <motion.div
//             className="max-w-full"
//             initial={{ x: -100, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <h1 className="relative z-10 text-5xl sm:text-6xl font-bold text-[#ffffff] leading-tight whitespace-normal lg:whitespace-nowrap wrap-break-word pt-10">
//               <span className="text-[#960018]">One</span> Stadium.<br /> Millions of Fans. <br /><span className="text-[#960018]">One</span> Voice.
//             </h1>

//             <p className="relative z-10 mt-8 text-lg md:text-2xl text-[#c3c3c3] leading-relaxed tracking-wider">
//               Join live fan rooms, support your fan tribe, and <br />experience matches together — in real time.
//             </p>

//             <div className="relative z-10 flex justify-start items-center gap-3 pt-5 pb-3">
//             <span><a href="https://play.google.com/store/apps/details?id=com.fanithapp" rel="noopener noreferrer" target="_blank" className="href"><img src="/assets/images/Google-Play-Features.png" alt="Google Play Store" className="h-auto w-auto cursor-pointer" /></a></span>{" "}<span><a href="https://apps.apple.com/in/app/fanith/id6760101126" className="href" rel="noopener noreferrer" target="_blank"><img src="/assets/images/App-Store-Features.png" alt="App Store" className="h-auto w-auto cursor-pointer" /></a></span>
//           </div>

//             <p className="relative z-10 mt-2 mb-0 text-[#c3c3c3] tracking-wider flex justify-start items-center gap-2">
//               <span><img src="/assets/svg/one-big-star.svg" alt="Star" className="w-6 h-6" /></span><span className="text-[22px]">4.8</span><span><img src="/assets/svg/5-star.svg" alt="Star" className="w-23 h-auto" /></span><span><img src="/assets/svg/mobile.svg" alt="Star" className="w-5 h-5" /></span><span className="text-[20px]">Available on Android & iOS</span>
//             </p>

//             <p className="relative z-10 mt-1 text-lg text-[#c3c3c3] tracking-wider flex justify-start items-center gap-2">
//               <span><img src="/assets/svg/fans-joined.svg" alt="Fans Joined" /></span><span className="text-xl">50,000+ fans joined</span>
//             </p>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }
