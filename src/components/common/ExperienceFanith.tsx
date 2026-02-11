"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import EarlyAccessModal from "../modals/EarlyAccessModal";

interface CenteredCTAProps {
  title: ReactNode;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CenteredCTA({
  title,
  description,
  buttonText = "Join Beta",
  buttonLink = "/join-beta",
}: CenteredCTAProps) {

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="bg-[#141414] py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        className="mx-auto max-w-4xl px-4 md:px-6 text-center"
      >
        
        <motion.h2 
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
          className="text-3xl md:text-4xl font-bold text-white"
        >
          {title}
        </motion.h2>

        <motion.p 
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1, 
              transition: { 
                duration: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              } 
            }
          }}
          className="mt-6 text-lg text-[#c3c3c3] leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div 
          variants={{
            hidden: { y: 30, opacity: 0, scale: 0.9 },
            visible: { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 12
              } 
            }
          }}
          className="mt-10"
        >
          {/* <Button
          onClick={()=> setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-[#960018] px-8 py-2 text-base font-semibold text-white transform transition-all duration-300 ease-in-out hover:bg-[#960018] hover:scale-105 cursor-pointer"
          >
            {buttonText}
          </Button> */}
          <div className="flex justify-center items-center gap-3">
            <span><img src="/assets/images/Google-Play-Features.png" alt="Google Play Store" className="h-12 w-auto" /></span>{" "}<span><img src="/assets/images/App-Store-Features.png" alt="App App Store" className="h-12 w-auto" /></span>
          </div>
        </motion.div>

      </motion.div>
      <EarlyAccessModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
    </section>
    
  );
}
