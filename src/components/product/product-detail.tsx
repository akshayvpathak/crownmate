"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import type { Product, Review } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { useProductSelectionStore } from "@/store/product-selection-store";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { getDeliveryEstimate } from "@/lib/delivery-estimate";
import { getDeliveryRangeText } from "@/lib/shipping";
import { SITE_CONFIG, WHATSAPP_URL } from "@/constants/assets";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetail({
  product,
  reviews,
  relatedProducts,
}: ProductDetailProps) {
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

  const delivery = useMemo(() => getDeliveryEstimate(), []);
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
    toast.success("Added to bag");
  };

  return (
    <div className={cn("section-padding", showStickyBar && "has-product-sticky-bar")}>
      <div className="container-site">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <ProductGallery
              images={product.images}
              title={product.title}
              slug={product.slug}
              selectedIndex={selectedImageIndex}
              onSelect={setSelectedImageIndex}
            />
          </div>

          <div className="min-w-0">
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
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of taxes</p>

            {product.specs && product.specs.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                      {spec.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <div className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Easy exchange</p>
                  <p className="text-xs text-muted-foreground">
                    Damaged on arrival? We fix it
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Secure checkout</p>
                  <p className="text-xs text-muted-foreground">UPI and cards</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm">
                <Truck className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Free shipping</p>
                  <p className="text-xs text-muted-foreground">Above ₹499, pan-India</p>
                </div>
              </div>
            </div>

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

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                Add to bag
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Link>
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-border p-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div>
                  <p className="font-semibold">{delivery.ordered}</p>
                  <p className="mt-1 text-muted-foreground">Ordered</p>
                </div>
                <div>
                  <p className="font-semibold">{delivery.ready}</p>
                  <p className="mt-1 text-muted-foreground">Order Ready</p>
                </div>
                <div>
                  <p className="font-semibold">{delivery.delivered}</p>
                  <p className="mt-1 text-muted-foreground">Delivered</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.fullDescription}
            </p>

            <Accordion type="single" collapsible defaultValue="info" className="mt-8">
              <AccordionItem value="info">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2 border-b border-border pb-3">
                      <span className="text-muted-foreground">Product</span>
                      <span className="font-medium">{product.title}</span>
                    </div>
                    {product.category && (
                      <div className="grid grid-cols-2 gap-2 border-b border-border pb-3">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                    )}
                    {product.specs?.map((spec) => (
                      <div
                        key={spec.label}
                        className="grid grid-cols-2 gap-2 border-b border-border pb-3 last:border-0"
                      >
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage">
                <AccordionTrigger>Usage &amp; Care</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed">
                    We usually dispatch within 24 hours. Delivery takes{" "}
                    {getDeliveryRangeText()} depending on your pin code. Free above
                    ₹499. Tracking link goes out by SMS and email once the courier picks
                    up.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>Easy Exchange &amp; Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed">
                    Something arrived broken? Email {SITE_CONFIG.email} within 48 hours
                    with photos. We&apos;ll arrange a replacement or refund — no back
                    and forth for a week.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {product.productFaqs && product.productFaqs.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold md:text-xl">Common questions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The stuff people ask us before ordering.
                </p>
                <Accordion type="single" collapsible className="mt-4">
                  {product.productFaqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductReviews
        reviews={reviews}
        rating={product.rating}
        reviewCount={reviews.length > 0 ? reviews.length : product.reviewCount}
      />
      <RelatedProducts products={relatedProducts} />

      {showStickyBar && (
        <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white p-2.5 shadow-lg sm:p-3 lg:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Today&apos;s Price
              </p>
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
              Add to bag
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
