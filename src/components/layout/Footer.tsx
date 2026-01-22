"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { _makePostRequest } from "../../api/api";
import endpoints from "../../api/endpoint";
import EarlyAccessModal from "../modals/EarlyAccessModal";

import { useCenterPopup } from "@/src/context/CenterPopupContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define proper types for social links
type SocialLink =
  | { type: "icon"; icon: React.ComponentType<{ size: number }>; href: string }
  | { type: "svg"; src: string; alt: string; href: string };

const socialLinks: SocialLink[] = [
  { type: "icon", icon: Facebook, href: "https://www.facebook.com/people/Fanith/61585037715830/" },
  { type: "icon", icon: Twitter, href: "https://x.com/fanith_app/" },
  { type: "icon", icon: Instagram, href: "https://www.instagram.com/fanith.app/" },
  { type: "icon", icon: Linkedin, href: "https://www.linkedin.com/showcase/fanith/" },
  { type: "svg", src: "/assets/svg/boticon.svg", alt: "Bot", href: "https://www.reddit.com/user/FanithApp/" },
];

type FooterLink =
  | { label: string; href: string; action?: never }
  | { label: string; action: "scroll-to-early-access"; href?: never };

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Discover",
    links: [
      { label: "Features", href: "/features" },
      { label: "FanDom", href: "/features?tab=fandom" },
      { label: "Fan Tribe", href: "/features?tab=tribe" },
      { label: "FanPedia", href: "/features?tab=fanpedia" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Join Beta", action: "scroll-to-early-access" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Brand Partnerships", href: "/contact?tab=brand" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const { showPopup } = useCenterPopup();

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinBeta = () => {
    setModalOpen(true);
  };

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await _makePostRequest(endpoints.EMAIL_SUBSCRIBE, {
        email: email.trim(),
      });

      // ✅ CENTER POPUP ON SUCCESS
      showPopup({
        title: "Subscribed Successfully 🎉",
        message:
          "Thank you for subscribing! You'll receive updates soon.",
      });

      setEmail("");
    } catch (error: any) {
      console.error("Email subscription error:", error);

      // ❌ TOAST ERROR
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="rounded-t-3xl bg-[#960018] text-white">

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 mb-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/images/Fanith_New_Footer_Logo.png"
              alt="Fanith Logo"
              width={150}
              height={150}
              priority
              className="object-cover"
            />
          </Link>

          <div className="flex items-center gap-4 ">
            <span>Follow Us</span>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:opacity-80 transition"
              >
                {link.type === "svg" ? (
                  <Image
                    src={link.src}
                    alt={link.alt}
                    width={18}
                    height={18}
                  />
                ) : (
                  <link.icon size={18} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div>
            <p className="max-w-md text-sm text-white/90 mb-6">
              Get the latest updates on Fanith features and releases.
            </p>

            <form
              onSubmit={handleEmailSubscription}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 rounded-xl border border-white/40 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transform transition-all duration-300 ease-in-out hover:bg-white/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <p className="mt-3 text-xs text-white/80">
              By subscribing you agree to our{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from Fanith.
            </p>
          </motion.div>

          {/* Right Links */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-sm font-semibold">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm text-white/90">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.action === "scroll-to-early-access" ? (
                        <button onClick={handleJoinBeta}>
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="my-6 h-px w-full bg-white/30" />

        <div className="flex justify-center text-sm font-medium text-white/90">
          Copyright © 2025 NARISTA ECOM PRIVATE LIMITED, All Rights Reserved.
        </div>
      </div>

      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </footer>
  );
}
