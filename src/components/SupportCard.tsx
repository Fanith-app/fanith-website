"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface SupportCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function SupportCard({
  title = "Do you have more questions?",
  description = "Can’t find what you’re looking for? Our support team is ready to assist you.",
  buttonText = "Contact Support",
  buttonLink = "/contact",
}: SupportCardProps) {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="w-80 sm:w-96 md:w-80 lg:w-96 xl:w-96 rounded-2xl bg-white shadow-[0px_10px_40px_10px_rgba(0,0,0,0.1)] px-8 py-10 text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg">
          <Image 
            src="/assets/svg/messageicon.svg" 
            alt="Card-icon" 
            width={80} 
            height={80}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#111111]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-[#333333]/60 font-semibold leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#D60000] to-[#FF0000] px-15 py-3 text-sm font-semibold text-[#FFFFFF] transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
