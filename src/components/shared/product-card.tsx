"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const variant = product.variants[0];
  const price = variant?.price ?? 0;
  const compareAt = variant?.compareAtPrice;
  const discount = calculateDiscount(price, compareAt);
  const image = variant?.image ?? product.images[0] ?? "";
  const hoverImage = product.images[1] ?? image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      image,
    });
    toast.success("Added to bag");
  };

  const hasMultipleVariants = product.variants.length > 1;

  return (
    <article className={cn("group flex min-w-0 flex-col", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="relative mb-3 block aspect-[4/5] overflow-hidden rounded-lg bg-secondary sm:aspect-square"
      >
        {image && (
          <>
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 transition-opacity duration-300 group-hover:opacity-0"
              loading="lazy"
            />
            {hoverImage !== image && (
              <Image
                src={hoverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
                aria-hidden
              />
            )}
          </>
        )}
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white md:text-xs">
            {discount}% OFF
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5">
        {/* Reviews */}
        <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground min-[400px]:text-[11px] md:text-xs">
          <div className="flex shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3",
                  i < Math.floor(product.rating)
                    ? "fill-foreground text-foreground"
                    : "text-border",
                )}
              />
            ))}
          </div>
          <span className="ml-0.5 hidden min-[360px]:inline">
            {product.reviewCount} reviews
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-xs font-medium leading-snug hover:underline min-[400px]:text-[13px] md:text-sm">
            {product.title}
          </h3>
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-xs font-semibold min-[400px]:text-sm md:text-base">
            {formatPrice(price)}
          </span>
          {compareAt && compareAt > price && (
            <span className="text-xs text-muted-foreground line-through md:text-sm">
              {formatPrice(compareAt)}
            </span>
          )}
        </div>

        {hasMultipleVariants ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-1.5 h-8 w-full rounded-full text-[10px] font-semibold uppercase tracking-wide min-[400px]:mt-2 min-[400px]:h-9 min-[400px]:text-xs"
            asChild
          >
            <Link href={`/products/${product.slug}`}>Select options</Link>
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="mt-1.5 h-8 w-full rounded-full text-[10px] font-semibold uppercase tracking-wide min-[400px]:mt-2 min-[400px]:h-9 min-[400px]:text-xs"
            onClick={handleQuickAdd}
          >
            Quick Add
          </Button>
        )}
      </div>
    </article>
  );
}
