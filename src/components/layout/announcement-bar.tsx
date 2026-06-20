"use client";

import Link from "next/link";
import { ANNOUNCEMENT_MESSAGES } from "@/constants/assets";

export function AnnouncementBar() {
  // Duplicate messages for seamless loop
  const messages = [...ANNOUNCEMENT_MESSAGES, ...ANNOUNCEMENT_MESSAGES];

  return (
    <div className="bg-gradient-to-r from-[#834fd9] to-[#a66fe1] text-white">
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 sm:gap-4 sm:px-4 sm:py-2 md:px-6">
        {/* Seamless Marquee Tape */}
        <div className="flex-1 overflow-hidden">
          <div className="announcement-marquee flex w-max gap-8 whitespace-nowrap sm:gap-10 md:gap-12">
            {messages.map((msg, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-[10px] md:text-xs"
              >
                {msg}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links (Hidden on Mobile) */}
        <div className="hidden shrink-0 items-center gap-3 whitespace-nowrap text-[9px] font-medium sm:text-[10px] md:gap-5 md:text-xs lg:flex">
          <Link
            href="/warranty-registration"
            className="transition-opacity hover:opacity-80"
          >
            Register warranty
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/track-order" className="transition-opacity hover:opacity-80">
            Track order
          </Link>
        </div>
      </div>
    </div>
  );
}
