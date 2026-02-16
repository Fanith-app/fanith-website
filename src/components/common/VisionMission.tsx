"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

type Item = {
  title: string;
  description: string;
  icon: string;
};

interface VisionMissionProps {
  items: Item[];
}

export default function VisionMission({ items }: VisionMissionProps) {
  return (
    <section className="relative pt-10 sm:pt-30 lg:pt-40 pb-10 sm:pb-24 overflow-hidden lg:-mt-50">
      <motion.div 
        className="mx-auto max-w-7xl px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2,
              delayChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:mt-2"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.1
              } 
            }
          }}
        >
          {items.map((item, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { 
                  opacity: 0
                },
                visible: { 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1
                  } 
                }
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group relative overflow-hidden bg-[#202020] rounded-none border-none shadow-2xl h-96 md:h-112.5">
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.2 + index * 0.1
                  }}
                >
                  {/* <Image
                    src="/assets/images/bg-img.png" 
                    alt="bg-img"
                    fill
                    className="object-cover opacity-70"
                  /> */}
                </motion.div>

                <CardContent className="relative px-6 sm:px-10 py-8 sm:py-14 text-center h-full flex flex-col justify-center">
                  {/* Icon */}
                  <div 
                    className="mx-auto mb-4 sm:mb-8 h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden shadow-lg transform transition-all duration-500 group-hover:scale-115 group-hover:rotate-6"
                 
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Title */}
                  <motion.h3 
                    className="text-2xl sm:text-3xl text-white font-bold mb-4 sm:mb-6 transform transition-all duration-500 group-hover:scale-102"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.5 + index * 0.1
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p 
                    className="text-base sm:text-lg leading-relaxed text-[#c3c3c3] transform transition-all duration-500 group-hover:text-[#c3c3c3] line-clamp-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.6 + index * 0.1
                    }}
                  >
                    {item.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
