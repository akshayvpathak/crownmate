"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { images } from "@/data/images";
import { mainNavigation } from "@/constants/navigation";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { MegaMenu } from "@/components/layout/mega-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/assets";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openCart,
    openSearch,
    closeSearch,
    isSearchOpen,
  } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="relative flex h-14 items-center justify-between px-3 sm:px-4 md:h-[72px] md:px-6 lg:px-8">
        {/* Mobile: hamburger left */}
        <div className="flex w-16 items-center sm:w-20 lg:w-auto lg:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Desktop logo */}
          <Link
            href="/"
            className="hidden items-center lg:flex"
            aria-label={`${SITE_CONFIG.name} home`}
          >
            <Image
              src={images.brand.logo}
              alt={SITE_CONFIG.name}
              width={100}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>
        </div>

        {/* Mobile: centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 lg:hidden"
          aria-label={`${SITE_CONFIG.name} home`}
        >
          <Image
            src={images.brand.logo}
            alt={SITE_CONFIG.name}
            width={90}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          {mainNavigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-2 py-2 text-[13px] font-medium text-foreground transition-colors hover:text-primary xl:px-3 xl:text-sm",
                  openDropdown === item.label && "text-primary",
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      openDropdown === item.label && "rotate-180",
                    )}
                  />
                )}
              </Link>
              {item.children && (
                <MegaMenu
                  item={item}
                  isOpen={openDropdown === item.label}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex w-16 items-center justify-end gap-0.5 sm:w-20 sm:gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Search"
            onClick={isSearchOpen ? closeSearch : openSearch}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10"
            onClick={openCart}
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-30 bg-white transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="flex h-full flex-col overflow-y-auto px-4 py-2"
          aria-label="Mobile navigation"
        >
          {mainNavigation.map((item) => (
            <div key={item.label} className="border-b border-border py-3.5">
              <Link
                href={item.href}
                className="block text-[15px] font-medium"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-2.5 space-y-2.5 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block text-sm text-muted-foreground"
                      onClick={closeMobileMenu}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
