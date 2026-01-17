"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Pick Your Team",
    description:
      "Choose your favorite team to personalize your experience.",
    icon: "/assets/images/work-icon1.png",
  },
  {
    title: "Join Game Rooms",
    description:
      "Chat live, vote in polls, and share reactions.",
    icon: "/assets/images/work-icon2.png",
  },
  {
    title: "Earn FanDom",
    description:
      "Collect points for every action you take.",
    icon: "/assets/images/work-icon3.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-linear-to-r from-[#9E1D1D] to-[#FF0000] py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-15"
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
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
      >

        {/* Heading */}
        <motion.h2 
          className="text-center text-4xl font-bold text-white mb-14"
          variants={{
            hidden: { y: 50, opacity: 0, scale: 0.9 },
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
        >
          How it Works
        </motion.h2>

        {/* Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.2
              } 
            }
          }}
        >
          {steps.map((step, index) => {

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { y: 60, opacity: 0, scale: 0.8, rotateY: 15 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    transition: { 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 120,
                      damping: 15
                    } 
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Card
                  className="group relative rounded-3xl border-none bg-linear-to-b from-[#000005] to-[#98352e] shadow-[0_8px_14px_-10px_#000000] transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] cursor-pointer" 
                >
                  <Image 
                    src="/assets/images/7063 1.png" 
                    alt="bg-img" 
                    fill 
                    className="object-cover opacity-70 rounded-3xl transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <CardContent className="flex flex-col items-center text-center p-10 text-[#FFFFFF] relative z-10">
                    
                    {/* Icon Circle */}
                    <motion.div 
                      className="mb-6 flex items-center justify-center h-20 w-20 rounded-full shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-12"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                       <Image
                        src={step.icon}
                        alt={step.title}
                        width={80}  
                        height={32}
                        className="object-cover rounded-full"
                      />
                    </motion.div>

                    <motion.h3 
                      className="text-2xl font-semibold mb-4 transform transition-all duration-500 group-hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p 
                      className="text-base text-white/90 leading-relaxed transform transition-all duration-500 group-hover:text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      {step.description}
                    </motion.p>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
