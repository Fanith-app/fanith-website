"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useState } from "react";
import EarlyAccessModal from "../modals/EarlyAccessModal";
import { Button } from "../ui/button";

interface PageHeroProps {
    title: string;
    description: string;
    backgroundImage: string;
    ctaText?: string;
    ctaLink?: string;
    children?: ReactNode;
    bottomcurve?: string;
}

export default function DownloadBanner({
    title,
    description,
    backgroundImage,
    ctaText,
    bottomcurve = "lg:h-180 ",
    children,
}: PageHeroProps) {

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <section className={`relative overflow-hidden ${bottomcurve} `}>

            {/* Background Image */}
            <div className="pt-15">
                <Image
                    src={backgroundImage}
                    alt={title}
                    priority
                    fill
                    className="w-full h-50"
                />
                {/* Dark Red Overlay */}
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/60 via-red-900/60 to-black/70" /> */}
            </div>

            {/* Content */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
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
                className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-0 md:pt-28 text-center text-white"
            >

                <motion.h1
                    variants={{
                        hidden: { y: 60, opacity: 0, scale: 0.9 },
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
                    className="text-3xl md:text-4xl font-bold leading-tight"
                >
                    {title}
                </motion.h1>

                <motion.p
                    variants={{
                        hidden: { y: 40, opacity: 0 },
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
                    className="mt-6 max-w-4xl mx-auto text-base md:text-2xl text-[#efefef] font-normal leading-relaxed"
                >
                    {description}
                </motion.p>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: 0.2
                            }
                        }
                    }}
                >
                    {children}
                </motion.div>

                <div className=" flex justify-center items-center gap-3 pt-4 pb-1">
                    <span><img src="/assets/images/Google-Play-Features.png" alt="Google Play Store" className="h-9 w-auto cursor-pointer" /></span>{" "}<span><img src="/assets/images/App-Store-Features.png" alt="App App Store" className="h-9 w-auto cursor-pointer" /></span>
                </div>

                {/* CTA (Optional) */}
                {ctaText && (
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
                                    delay: 0.3,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 12
                                }
                            }
                        }}
                        className="mt-7"
                    >
                        <Button
                            onClick={() => setModalOpen(true)}
                            className="inline-flex items-center justify-center rounded-full bg-[#960018] px-10 py-2 pb-4 text-lg text-center font-normal text-[#F8F8F8] transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#960018] cursor-pointer"
                        >
                            {ctaText}
                        </Button>
                    </motion.div>
                )}

            </motion.div>

            <EarlyAccessModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />

        </section>

    );
}
