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
import { Button } from "@/components/ui/button";
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
    if (!variant) return;
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
  };

  return (
    <div className={compact ? "mt-4" : "border-t border-border p-4"}>
      <p className="mb-3 text-sm font-semibold">⭐ Frequently Bought Together!</p>
      <div className="space-y-3">
        {suggestions.map((product) => {
          const variant = product.variants[0];
          const image = variant?.image ?? product.images[0] ?? "";
          const price = variant?.price ?? 0;

          return (
            <div key={product.id} className="flex items-center gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary"
                onClick={closeCart}
              >
                {image && (
                  <Image
                    src={image}
                    alt={product.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="line-clamp-2 text-xs font-medium hover:underline"
                  onClick={closeCart}
                >
                  {product.title}
                </Link>
                <p className="text-xs font-semibold">{formatPrice(price)}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => handleAdd(product)}
                aria-label={`Add ${product.title} to cart`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
