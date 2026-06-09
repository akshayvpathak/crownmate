"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { DISCOUNT_TIERS } from "@/constants/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { FrequentlyBoughtTogether } from "@/components/cart/frequently-bought-together";

export function CartDrawerContent() {
  const { closeCart } = useUIStore();
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

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const nextTier = getNextDiscountTier();
  const amountToNext = getAmountToNextTier();

  return (
    <div className="flex flex-col px-4 pb-6">
      {nextTier && (
        <div className="mb-4 rounded-lg bg-secondary p-3">
          <p className="mb-2 text-xs">
            You&apos;re only {formatPrice(amountToNext)} away from {nextTier.label}.
          </p>
          <div className="flex justify-between text-xs">
            {DISCOUNT_TIERS.map((tier) => (
              <span key={tier.threshold} className="text-center">
                <strong>₹{tier.threshold}</strong>
                <br />
                {tier.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          Your cart is currently empty.
        </p>
      ) : (
        <ul className="mb-4 max-h-[40vh] space-y-4 overflow-y-auto">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-7 w-7"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <FrequentlyBoughtTogether compact />

      {items.length > 0 && (
        <>
          <div className="mb-3 flex gap-2">
            <Input
              placeholder="Coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() =>
                applyCoupon(couponInput)
                  ? toast.success("Applied!")
                  : toast.error("Invalid")
              }
            >
              Apply
            </Button>
          </div>
          <div className="mb-4 space-y-1 text-sm">
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
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <p className="mb-3 text-center text-xs text-muted-foreground">
            If you Don&apos;t Get The Results You Expected, Enjoy{" "}
            <span className="font-semibold text-foreground">Money Back Guarantee</span>
          </p>
          <Button className="w-full" asChild>
            <Link href="/checkout" onClick={closeCart}>
              Checkout
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
