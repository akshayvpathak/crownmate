"use client";

import Link from "next/link";
import { ANNOUNCEMENT_MESSAGES } from "@/constants/assets";

export function AnnouncementBar() {
  const messages = [...ANNOUNCEMENT_MESSAGES, ...ANNOUNCEMENT_MESSAGES];

  return (
    <div className="bg-[#834fd9] text-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] font-medium sm:gap-4 sm:px-4 sm:py-2.5 sm:text-xs md:px-6 md:text-sm">
        <div className="flex-1 overflow-hidden md:text-center">
          <div className="announcement-marquee flex w-max gap-10 whitespace-nowrap md:mx-auto">
            {messages.map((msg, i) => (
              <span key={i}>{msg}</span>
            ))}
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-5 text-xs md:flex">
          <Link href="/warranty-registration" className="hover:underline">
            Register warranty
          </Link>
          <Link href="/track-order" className="hover:underline">
            Track order
          </Link>
        </div>
      </div>
    </div>
  );
}
