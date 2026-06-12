"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { frequentlyBoughtTogetherSlugs } from "@/data/home-content";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const products = productsData as Product[];

const fbtProducts = frequentlyBoughtTogetherSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => p !== undefined);

interface FrequentlyBoughtTogetherProps {
  compact?: boolean;
}

export function FrequentlyBoughtTogether({
  compact = false,
}: FrequentlyBoughtTogetherProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const { closeCart } = useUIStore();

  const cartSlugs = new Set(cartItems.map((i) => i.slug));
  const suggestions = fbtProducts
    .filter((p) => !cartSlugs.has(p.slug))
    .slice(0, compact ? 4 : 6);

  if (suggestions.length === 0) return null;

  const handleAdd = (product: Product) => {
    const variant = product.variants[0];
    if (!variant?.available) {
      toast.error(`${product.title} is out of stock`);
      return;
    }
    addItem({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      image: variant.image ?? product.images[0] ?? "",
    });
    toast.success("Added to cart");
    if (compact) closeCart();
  };

  return (
    <div className={compact ? "mb-4" : "mt-8"}>
      <h3 className="mb-3 text-sm font-semibold">Frequently bought together</h3>
      <div
        className={
          compact
            ? "flex gap-2 overflow-x-auto pb-1"
            : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {suggestions.map((product) => {
          const variant = product.variants[0];
          return (
            <div
              key={product.id}
              className={
                compact
                  ? "flex w-28 shrink-0 flex-col rounded-lg border border-border p-2"
                  : "flex gap-3 rounded-xl border border-border p-3"
              }
            >
              <div
                className={
                  compact
                    ? "relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-secondary"
                    : "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary"
                }
              >
                <Image
                  src={variant?.image ?? product.images[0]}
                  alt={product.title}
                  fill
                  sizes={compact ? "112px" : "64px"}
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="line-clamp-2 text-xs font-medium hover:text-primary"
                >
                  {product.title}
                </Link>
                <p className="mt-1 text-xs font-semibold">
                  {formatPrice(variant?.price ?? 0)}
                </p>
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-border bg-secondary/60 py-1.5 text-[11px] font-medium text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-white"
                >
                  <Plus className="h-3 w-3" />
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
