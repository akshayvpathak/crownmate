"use client";

import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CartDrawerContent } from "@/components/cart/cart-drawer-content";
import { StickyCheckoutCta } from "@/components/cart/sticky-checkout-cta";

export function MobileCartDrawer() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { isCartOpen, closeCart } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isMobile) return <StickyCheckoutCta />;

  return (
    <>
      <Drawer open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader>
            <DrawerTitle>
              Your items ({itemCount} {itemCount === 1 ? "Item" : "Items"})
            </DrawerTitle>
          </DrawerHeader>
          <CartDrawerContent />
        </DrawerContent>
      </Drawer>
      <StickyCheckoutCta />
    </>
  );
}
