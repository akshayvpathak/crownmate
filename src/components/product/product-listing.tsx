"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import {
  applyProductFilters,
  defaultFilterState,
  getPriceRange,
  type ProductFilterState,
} from "@/lib/product-utils";

interface ProductListingProps {
  products: Product[];
  title: string;
  description?: string;
}

export function ProductListing({ products, title, description }: ProductListingProps) {
  const [filters, setFilters] = useState<ProductFilterState>(defaultFilterState);
  const priceRange = useMemo(() => getPriceRange(products), [products]);

  const filtered = useMemo(
    () => applyProductFilters(products, filters),
    [products, filters],
  );

  return (
    <div className="section-padding">
      <div className="container-site">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">{title}</h1>
        {description && <p className="mb-4 text-muted-foreground">{description}</p>}
        <p className="mb-6 text-sm text-muted-foreground md:mb-8">
          {filtered.length} of {products.length} products
        </p>

        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-10">
          <aside className="w-full shrink-0 lg:w-56 xl:w-64">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              priceRange={priceRange}
            />
          </aside>

          <div className="min-w-0 flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 min-[400px]:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                No products match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
