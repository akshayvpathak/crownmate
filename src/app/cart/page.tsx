"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { getShippingLabel } from "@/lib/shipping";
import { DISCOUNT_TIERS } from "@/constants/assets";
import { useActiveCoupons } from "@/hooks/use-active-coupons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FrequentlyBoughtTogether } from "@/components/cart/frequently-bought-together";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const getAmountToNextTier = useCartStore((s) => s.getAmountToNextTier);
  const getNextDiscountTier = useCartStore((s) => s.getNextDiscountTier);
  const [couponInput, setCouponInput] = useState("");
  const couponCodes = useActiveCoupons();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const nextTier = getNextDiscountTier();
  const amountToNext = getAmountToNextTier();

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-site text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">
            Add some products to get started.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-site">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">
          Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 rounded-xl border border-border p-3 sm:gap-4 sm:p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-24 sm:w-24">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
                  {item.variantTitle !== "Default Title" && (
                    <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                  )}
                  <p className="font-semibold">{formatPrice(item.price)}</p>
                  <div className="mt-auto flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-destructive"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <FrequentlyBoughtTogether />
          </div>

          <div className="sticky top-24 h-fit rounded-xl border border-border p-6">
            {nextTier && (
              <div className="mb-4 rounded-lg bg-secondary p-3 text-sm">
                <p>
                  You&apos;re only {formatPrice(amountToNext)} away from{" "}
                  {nextTier.label}.
                </p>
                <div className="mt-2 flex justify-between text-xs">
                  {DISCOUNT_TIERS.map((t) => (
                    <span key={t.threshold}>
                      <strong>₹{t.threshold}</strong>
                      <br />
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4 flex flex-col gap-2 min-[400px]:flex-row">
              <Input
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="min-w-0"
              />
              <Button
                variant="outline"
                className="shrink-0"
                onClick={async () => {
                  const applied = await applyCoupon(couponInput);
                  if (applied) toast.success("Applied!");
                  else toast.error("Invalid code");
                }}
              >
                Apply
              </Button>
            </div>
            {couponCodes.length > 0 && (
              <p className="mb-4 text-xs text-muted-foreground">
                Try: {couponCodes.join(", ")}
              </p>
            )}

            <div className="space-y-2 text-sm">
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
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>{getShippingLabel(subtotal)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button className="mt-6 w-full" size="lg" asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
