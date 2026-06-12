"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { getShippingLabel } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { FrequentlyBoughtTogether } from "@/components/cart/frequently-bought-together";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getSubtotal();
  const total = getTotal();

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
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
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
