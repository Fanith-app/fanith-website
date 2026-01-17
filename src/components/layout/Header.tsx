"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { navLinks } from "@/src/lib/data";
import EarlyAccessModal from "../modals/EarlyAccessModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // const scrollToEarlyAccess = () => {
  //   const earlyAccessSection = document.getElementById('early-access');
  //   if (earlyAccessSection) {
  //     earlyAccessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  const handleJoinBeta = () => {
      setModalOpen(true);
  };

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between px-2 ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/svg/logo.svg"
              alt="Fanith Logo"
              width={150}
              height={150}
              priority
              className="object-cover"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-md font-medium transition ${isActiveLink(link.href)
                  ? "text-[#ff0000]" // active
                  : "text-gray-700 hover:text-black" // inactive
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleJoinBeta}
              className="hidden lg:inline-flex items-center rounded-full bg-linear-to-r from-[#ff0000] to-[#de0000] px-5 py-2 text-sm font-semibold text-white transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
            >
              Join Beta
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md border transform transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-500 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Image
              src="/assets/svg/logo.svg"
              alt="Fanith Logo"
              width={120}
              height={120}
              priority
              className="object-cover"
            />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col p-4 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium transition-all duration-200 py-2 px-3 rounded-lg transform hover:translate-x-1 ${isActiveLink(link.href)
                  ? "text-[#ff0000] bg-red-50" // active
                  : "text-gray-700 hover:text-black hover:bg-gray-50" // inactive
                  }`}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animation: open ? 'slideInFromRight 0.5s ease-out forwards' : 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Join Beta Button - Fixed at bottom */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                handleJoinBeta();
                setOpen(false);
              }}
              className="w-full inline-flex justify-center rounded-full bg-linear-to-r from-[#ff0000] to-[#de0000] px-6 py-3 text-sm font-semibold text-white transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-lg"
              style={{
                animationDelay: `${navLinks.length * 80}ms`,
                animation: open ? 'slideInFromRight 0.5s ease-out forwards' : 'none'
              }}
            >
              Join Beta
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Early Access Modal */}
      <EarlyAccessModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </header>
  );
}
