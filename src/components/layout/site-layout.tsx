"use client";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AgeGate } from "@/components/layout/age-gate";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileCartDrawer } from "@/components/cart/mobile-cart-drawer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SearchDrawer } from "@/components/layout/search-drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen has-mobile-sticky-bar md:pb-0">{children}</main>
      <Footer />
      <AgeGate />
      <SearchDrawer />
      {isMobile ? <MobileCartDrawer /> : <CartDrawer />}
      <ScrollToTop />
    </>
  );
}
