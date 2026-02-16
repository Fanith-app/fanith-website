import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: "Sports Memes",
    description: "Share match memes the moment it happens.",
    icon: "/assets/svg/sports-memes.svg",
  },
  {
    title: "Media Sharing",
    description: "Post clips, screenshots, and moments.",
    icon: "/assets/svg/media-sharing.svg",
  },
  {
    title: "Analytical Stats",
    description: "Break down matches with real-time data.",
    icon: "/assets/svg/analytical-stats.svg",
  },
  {
    title: "Friendly Banters",
    description: "React, tease, and celebrate with rival fans.",
    icon: "/assets/svg/friendly-banters.svg",
  },
];

export default function WhatYouCanDo() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* LEFT IMAGE */}
          <div className="relative overflow-hidden rounded-[32px] h-full">
            <Image
              src="/assets/images/What-you-can-do.webp"
              alt="Fans enjoying match"
              fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            
            {/* Heading */}
            <h3 className="text-2xl font-semibold text-white mb-1">
              What you can do
            </h3>

            {/* Sub text */}
            <p className="text-sm text-white/60 mb-6">
              Everything fans do during a match — now in one place.
            </p>

            {/* FEATURES LIST */}
            <div className="space-y-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl bg-black/60 p-4 border border-white/10"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900/30 text-red-500">
                    <img src={item.icon} />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#c3c3c3]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
