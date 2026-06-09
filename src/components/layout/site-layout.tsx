"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileCartDrawer } from "@/components/cart/mobile-cart-drawer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SearchDrawer } from "@/components/layout/search-drawer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { matchesAdminUrlPath } from "@/lib/admin-path";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();
  const isAdminRoute = matchesAdminUrlPath(pathname);

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen has-mobile-sticky-bar md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <SearchDrawer />
      {isMobile ? <MobileCartDrawer /> : <CartDrawer />}
      <ScrollToTop />
    </>
  );
}
