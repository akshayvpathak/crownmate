"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function StickyCheckoutCta() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = useCartStore((s) => s.getTotal());
  const openCart = useUIStore((s) => s.openCart);

  const isProductPage = pathname.startsWith("/products/");

  if (itemCount === 0 || isProductPage) return null;

  return (
    <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background p-2.5 shadow-lg sm:p-3 md:hidden">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={openCart}
          className="relative h-10 w-10 shrink-0"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
            {itemCount}
          </span>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-muted-foreground sm:text-xs">
            {itemCount} items
          </p>
          <p className="text-sm font-bold sm:text-base">{formatPrice(total)}</p>
        </div>
        <Button
          asChild
          className="h-10 shrink-0 px-3 text-xs sm:h-11 sm:px-4 sm:text-sm"
        >
          <Link href="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
