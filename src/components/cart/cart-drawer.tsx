"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { COUPON_CODES, DISCOUNT_TIERS } from "@/constants/assets";
import { getShippingLabel } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { FrequentlyBoughtTogether } from "@/components/cart/frequently-bought-together";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const couponCode = useCartStore((s) => s.couponCode);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const getAmountToNextTier = useCartStore((s) => s.getAmountToNextTier);
  const getNextDiscountTier = useCartStore((s) => s.getNextDiscountTier);
  const [couponInput, setCouponInput] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const nextTier = getNextDiscountTier();
  const amountToNext = getAmountToNextTier();

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      toast.success("Coupon applied!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={closeCart} aria-hidden />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">
            Your items ({items.length} {items.length === 1 ? "Item" : "Items"})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Discount progress */}
        {nextTier && (
          <div className="border-b border-border p-4">
            <p className="mb-3 text-xs text-muted-foreground">
              You&apos;re only {formatPrice(amountToNext)} away from {nextTier.label}.
            </p>
            <div className="flex justify-between gap-2 text-xs">
              {DISCOUNT_TIERS.map((tier) => (
                <div key={tier.threshold} className="text-center">
                  <p className="font-bold">₹{tier.threshold}</p>
                  <p className="text-muted-foreground">{tier.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs">🎁 Free Gift Automatically Added at Checkout</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              Your cart is currently empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-medium hover:underline"
                      onClick={closeCart}
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle !== "Default Title" && (
                      <p className="text-xs text-muted-foreground">
                        {item.variantTitle}
                      </p>
                    )}
                    <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-8 w-8 text-destructive"
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <FrequentlyBoughtTogether />
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4">
            <p className="mb-2 text-[10px] text-muted-foreground">
              Coupons: {COUPON_CODES.join(", ")}
            </p>
            <div className="mb-3 flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                aria-label="Coupon code"
              />
              <Button variant="outline" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {couponCode && (
              <p className="mb-2 text-xs text-success">Coupon {couponCode} applied</p>
            )}

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{getShippingLabel(subtotal)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1 font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button className="w-full" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/cart" onClick={closeCart}>
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
