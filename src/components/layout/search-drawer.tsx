"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const products = productsData as Product[];

export function SearchDrawer() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  if (!isSearchOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={handleClose}
        aria-hidden
      />
      <aside
        className="fixed inset-x-0 top-0 z-50 max-h-[90vh] overflow-y-auto bg-white shadow-xl sm:max-h-[85vh] md:inset-x-auto md:right-0 md:left-auto md:h-full md:max-h-none md:w-full md:max-w-md"
        role="dialog"
        aria-label="Search products"
      >
        <div className="sticky top-0 z-10 border-b border-border bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                aria-label="Search products"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {query.trim() === "" ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Search for products, collections, and more
            </p>
          ) : results.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="space-y-3">
              {results.map((product) => {
                const variant = product.variants[0];
                const image = variant?.image ?? product.images[0] ?? "";
                return (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary"
                      onClick={handleClose}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        {image && (
                          <Image
                            src={image}
                            alt={product.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">
                          {product.title}
                        </p>
                        <p className="text-sm font-semibold">
                          {formatPrice(variant?.price ?? 0)}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
