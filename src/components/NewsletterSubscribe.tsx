"use client";

import { useCenterPopup } from "@/src/context/CenterPopupContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { _makePostRequest } from "../api/api";
import endpoints from "../api/endpoint";

interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

export default function NewsletterSubscribe({
  title = "Stay Updated with Fanith News",
  description = "Get the latest match highlights, exclusive fan stories, and platform updates directly to your inbox.",
  placeholder = "Email",
  buttonText = "Subscribe",
  onSubmit,
}: NewsletterSubscribeProps) {
  const { showPopup } = useCenterPopup();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await _makePostRequest(endpoints.EMAIL_SUBSCRIBE, {
        email: email.trim(),
      });

      // ✅ CENTER POPUP SUCCESS
      showPopup({
        title: "Subscribed Successfully 🎉",
        message:
          "Thank you for subscribing! You’ll receive the latest Fanith updates straight to your inbox.",
      });

      if (onSubmit) onSubmit(email.trim());
      setEmail("");
    } catch (error: any) {
      console.error("Email subscription error:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-4 md:py-20">
      <motion.div
        className="mx-auto max-w-7xl px-4 md:px-6"
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
            },
          },
        }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10 rounded-3xl bg-[#202020] px-10 py-12"
          variants={{
            hidden: { y: 60, opacity: 0, scale: 0.95 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
            },
          }}
        >
          {/* Left Content */}
          <motion.div className="max-w-xl">
            <motion.h2 className="text-3xl font-extrabold text-white">
              {title}
            </motion.h2>
            <motion.p className="mt-4 text-lg text-[#c3c3c3] leading-relaxed">
              {description}
            </motion.p>
          </motion.div>

          {/* Right Form */}
          <motion.div className="flex flex-col w-full max-w-xl">
            {/* <div className="flex flex-col md:flex-row items-center gap-4 w-full"> */}
            <div className="flex items-center rounded-full border border-white/20 bg-[#202020] p-1">
              <motion.input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 w-full rounded-lg bg-transparent px-6 py-4 text-[#c3c3c3] placeholder:text-[#c3c3c3] focus:outline-none text-md"
              />

              <motion.button
                onClick={handleEmailSubscription}
                disabled={isSubmitting}
                // className="rounded-lg bg-white w-full md:w-fit px-8 py-3 sm:py-4 text-lg font-semibold text-black disabled:opacity-70"
                className="rounded-full bg-[#960018] px-8 py-4 text-md font-semibold text-white transition-all hover:bg-[#b3001d] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Subscribing..." : buttonText}
              </motion.button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm font-medium text-red-500"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
