"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useState } from "react";
import EarlyAccessModal from "../modals/EarlyAccessModal";

interface PageHeroProps {
    title: string;
    description: string;
    backgroundImage: string;
    children?: ReactNode;
    bottomcurve?: string;
}

export default function DownloadBanner({
    title,
    description,
    backgroundImage,
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

                <div className=" flex justify-center items-center gap-3 pt-9 pb-1">
                    <span><a href="https://play.google.com/store/apps/details?id=com.fanithapp" rel="noopener noreferrer" target="_blank" className="href"><img src="/assets/images/Google-Play-Features.png" alt="Google Play Store" className="h-auto w-auto cursor-pointer" /></a></span>{" "}<span><img src="/assets/images/App-Store-Features.png" alt="App Store" className="h-auto w-auto cursor-pointer" /></span>
                </div>

            </motion.div>

            <EarlyAccessModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />

        </section>

    );
}
