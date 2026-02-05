"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function PartnersAndFeatures() {
  return (
    <section className="w-full mx-auto px-4 md:px-15 py-16 space-y-20 bg-[#141414]">
      {/* ===================== */}
      {/* OUR PARTNERS */}
      {/* ===================== */}
      <div className="text-center space-y-10 w-full">
        <h2 className="text-4xl font-semibold text-white text-center">Our Partners</h2>

        <div className="flex items-center justify-center gap-14 flex-wrap">
          {/* Replace src with your actual logos */}
          {[
            "/assets/svg/partner1.svg",
            "/assets/svg/partner2.svg",
            "/assets/svg/partner3.svg",
            "/assets/svg/partner4.svg",
          ].map((logo, index) => (
            <div key={index} className="relative h-30 w-50">
              <Image
                src={logo}
                alt="Partner logo"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/* APP FEATURES */}
      {/* ===================== */}
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">
          App Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          LEFT LARGE CARD
          <FeatureCard
            icon={<Image src="/assets/images/feature-icon1.png" alt={"Feature Icon"} width={24} height={24} />}
            title="Game room real-time action"
            description="Real-time chat, polls, and match moments."
            image="/assets/images/gameroom.png"
            large
          />

          RIGHT COLUMN
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              icon={<Image src="/assets/images/feature-icon2.png" alt={"Feature Icon"} width={24} height={24} />}
              title="Fan tribe support your team"
              description={<>Earn points, badges, and climb leaderboards.</>}
              image="/assets/images/fantribe.png"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Image src="/assets/images/feature-icon3.png" alt={"Feature Icon"} width={24} height={24} />}
                title="FanDom points and badges"
                description="Unite with fellow fans and support teams."
              />

              <FeatureCard
                icon={<Image src="/assets/images/feature-icon4.png" alt={"Feature Icon"} width={24} height={24} />}
                title="FanPedia Sports knowledge"
                description="Explore player stats and contribute media."
              />
            </div>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}

/* ===================== */
/* FEATURE CARD */
/* ===================== */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  image?: string;
  large?: boolean;
  style?: React.CSSProperties;
}

function FeatureCard({
  icon,
  title,
  description,
  image,
  large,
}: FeatureCardProps) {
  return (
    <div
      className={`p-[1.5px] rounded-xl bg-linear-to-r from-[#9E1D1D] to-[#FF0000] flex flex-col justify-between relative
        ${large ? "row-span-2" : ""}`}
    >
      <div className={`z-10 relative rounded-2xl p-6 min-h-[260px] lg:min-h-[280px] bg-white shadow-sm overflow-hidden ${large ? 'rounded-b-none' : 'h-full'}`}>
        <div className={`space-y-4 relative z-10 ${image && !large ? "w-full lg:w-1/2" : "w-full"
          }`}>
          <div className="w-9 h-9 flex items-center justify-center">
            {icon}
          </div>

          <h3 className="text-lg text-[#111111] font-semibold">{title}</h3>
          <p className="text-md text-[#333333]">{description}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
            <button className="bg-gradient-to-r from-[#D60000] to-[#FF0000] text-white text-sm lg:text-base px-4 py-2 min-h-[40px] rounded-md whitespace-nowrap transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
              Watch Video
            </button>

            <button className="flex items-center gap-1 text-sm font-medium underline underline-offset-2 whitespace-nowrap transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
              Explore <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {image && !large && (
          <div className="absolute hidden lg:block right-0 top-0 h-full w-1/2 rounded-r-2xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              style={{ objectPosition: '50% 35%' }}
            />
          </div>
        )}
      </div>
      {image && large && (
        <div className="flex-1 relative rounded-b-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: '50% 27%' }}
          />
        </div>
      )}
    </div>
  );
} 
