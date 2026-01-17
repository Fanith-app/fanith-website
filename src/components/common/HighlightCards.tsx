"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import clsx from "clsx";

type HighlightItem = {
  title: string;
  description: string;
  image: string;
};

interface HighlightCardsProps {
  items: HighlightItem[];
}

export default function HighlightCards({ items }: HighlightCardsProps) {
  return (
    <section className="bg-linear-to-r from-[#9E1D1D] to-[#FF0000] py-24">
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
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2,
              delayChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end"
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
                  y: 60, 
                  opacity: 0, 
                  scale: 0.9,
                  rotateX: 15
                },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.1
                  } 
                }
              }}
            >
              <HighlightCard
                {...item}
                elevated={index === 1}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================= CARD ================= */

interface HighlightCardProps extends HighlightItem {
  elevated?: boolean;
}

function HighlightCard({
  title,
  description,
  image,
  elevated,
}: HighlightCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card
        className={clsx(
          "group relative overflow-hidden rounded-[32px] border-none shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer",
          elevated && "md:-translate-y-10"
        )}
      >
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-90 transform transition-all duration-500 group-hover:scale-105"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/10 transition-all duration-500" />
        </motion.div>

        <CardContent className="relative z-10 flex min-h-90 flex-col items-center justify-center px-8 text-center text-white">
          <motion.h3 
            className="text-2xl font-bold mb-4 transform transition-all duration-500 group-hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-base text-white/90 leading-relaxed transform transition-all duration-500 group-hover:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5
            }}
          >
            {description}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
