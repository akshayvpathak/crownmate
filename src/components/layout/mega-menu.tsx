"use client";

import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  if (!item.children || !isOpen) return null;

  const isMega = item.megaMenu;

  if (!isMega) {
    return (
      <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border border-border bg-white py-2 shadow-lg">
        {item.children.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            className="block px-4 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-primary"
            onClick={onClose}
          >
            {child.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 top-[72px] z-40 bg-black/10"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-x-0 top-[72px] z-50 border-t border-border bg-white shadow-xl">
        <div className="container-site py-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {item.label}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="group flex flex-col items-center gap-3 text-center"
                onClick={onClose}
              >
                {child.image && (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-secondary ring-1 ring-border transition-all group-hover:ring-primary md:h-24 md:w-24">
                    <Image
                      src={child.image}
                      alt={child.label}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold transition-colors group-hover:text-primary">
                    {child.label}
                  </p>
                  {child.itemCount !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      {child.itemCount} items
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <Link
              href={item.href}
              className={cn("text-sm font-semibold text-primary hover:underline")}
              onClick={onClose}
            >
              View all {item.label} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
