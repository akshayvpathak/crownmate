"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Minus, Plus, Truck, Shield } from "lucide-react";
import type { Product, Review } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { useProductSelectionStore } from "@/store/product-selection-store";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/assets";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PressSection } from "@/components/home/press-section";
import { ProductReviews } from "@/components/product/product-reviews";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
}

export function ProductDetail({ product, reviews }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const {
    selectedVariantId,
    selectedImageIndex,
    quantity,
    setSelectedVariant,
    setSelectedImageIndex,
    incrementQuantity,
    decrementQuantity,
    reset,
  } = useProductSelectionStore();

  const variant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  useEffect(() => {
    reset();
    if (product.variants[0]) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product.id, product.variants, reset, setSelectedVariant]);

  const price = variant?.price ?? 0;
  const compareAt = variant?.compareAtPrice;
  const discount = calculateDiscount(price, compareAt);
  const image =
    product.images[selectedImageIndex] ?? variant?.image ?? product.images[0] ?? "";

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!variant) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      quantity,
      image,
    });
    toast.success("Added to cart");
  };

  return (
    <div className={cn("section-padding", showStickyBar && "has-product-sticky-bar")}>
      <div className="container-frizty">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              {image && (
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {product.images.slice(0, 8).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                      selectedImageIndex === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-foreground text-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-xl font-bold leading-tight min-[400px]:text-2xl md:text-3xl">
              {product.title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              1000+ People ordered this in the last 7 days
            </p>

            <div className="mt-4 flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-xl font-bold min-[400px]:text-2xl md:text-3xl">
                {formatPrice(price)}
              </span>
              {compareAt && compareAt > price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(compareAt)}
                  </span>
                  <Badge variant="sale">{discount}% OFF</Badge>
                </>
              )}
            </div>

            {/* Variant selection */}
            {product.variants.length > 1 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium">Pack:</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.id)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm transition-colors min-h-[44px] ${
                        selectedVariantId === v.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="mt-6 w-full" size="lg" onClick={handleAddToCart}>
              Add To Cart
            </Button>

            <div className="mt-6 space-y-3 rounded-xl bg-secondary p-4 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping — Arrives in 3-4 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>1 Year Warranty + 90-Day Money Back Guarantee</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 font-semibold">For Any Query Reach Out to us</h4>
              <p className="text-sm">
                Email:{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="underline">
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="text-sm">
                Call:{" "}
                <a href={`tel:${SITE_CONFIG.phone}`} className="underline">
                  {SITE_CONFIG.phone}
                </a>
              </p>
            </div>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {product.fullDescription.slice(0, 1500)}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="results">
                <AccordionTrigger>How Quickly Can I Expect Results?</AccordionTrigger>
                <AccordionContent>
                  Many users start noticing reduced puffiness and improved skin
                  freshness within the first few uses. For best results, use for 10
                  minutes everyday.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="safety">
                <AccordionTrigger>Is it Safe to Use?</AccordionTrigger>
                <AccordionContent>
                  Yes. Frizty products are designed for safe and gentle use on all skin
                  types.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warranty">
                <AccordionTrigger>Guarantee &amp; Warranty</AccordionTrigger>
                <AccordionContent>
                  1 Year Warranty on manufacturing defects. 90-Day Money-Back Guarantee.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>SHIPPING &amp; RETURNS</AccordionTrigger>
                <AccordionContent>
                  Orders processed within 24 hours. Delivery in 3-4 working days across
                  India. Contact support within 48 hours for damaged products.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <ProductReviews
        reviews={reviews}
        rating={product.rating}
        reviewCount={reviews.length > 0 ? reviews.length : product.reviewCount}
      />
      <TestimonialsSection />
      <PressSection />

      {/* Mobile sticky add-to-cart */}
      {showStickyBar && (
        <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white p-2.5 shadow-lg sm:p-3 lg:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold sm:text-lg">{formatPrice(price)}</p>
              {compareAt && compareAt > price && (
                <p className="text-[10px] text-muted-foreground line-through sm:text-xs">
                  {formatPrice(compareAt)}
                </p>
              )}
            </div>
            <Button
              size="lg"
              className="h-10 shrink-0 px-4 text-xs sm:h-11 sm:px-8 sm:text-sm"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
