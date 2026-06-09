"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  defaultFilterState,
  type ProductFilterState,
  type SortOption,
  type StockFilter,
} from "@/lib/product-utils";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "title-asc", label: "Alphabetically, A-Z" },
  { value: "title-desc", label: "Alphabetically, Z-A" },
];

interface ProductFiltersProps {
  filters: ProductFilterState;
  onChange: (filters: ProductFilterState) => void;
  priceRange: { min: number; max: number };
}

export function ProductFilters({ filters, onChange, priceRange }: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const update = (partial: Partial<ProductFilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const reset = () => onChange(defaultFilterState);

  const hasActiveFilters =
    filters.stock !== "all" || filters.minPrice !== null || filters.maxPrice !== null;

  return (
    <div className="space-y-4">
      {/* Sort — always visible */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Sort by</label>
        <Select
          value={filters.sort}
          onValueChange={(v) => update({ sort: v as SortOption })}
        >
          <SelectTrigger className="w-full">
            <ArrowUpDown className="mr-2 h-4 w-4 shrink-0" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile filter toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="w-full lg:hidden"
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">
            Active
          </span>
        )}
      </Button>

      {/* Filter panel — mobile collapsible, desktop always visible */}
      <div
        className={`space-y-4 rounded-lg border border-border p-4 ${
          showMobileFilters ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Availability
          </h4>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: "all", label: "All" },
                { value: "in-stock", label: "In stock" },
                { value: "out-of-stock", label: "Out of stock" },
              ] as { value: StockFilter; label: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update({ stock: opt.value })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  filters.stock === opt.value
                    ? "border-foreground bg-foreground text-white"
                    : "border-border hover:border-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Price range
          </h4>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={`₹${priceRange.min}`}
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                update({
                  minPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="h-9 text-sm"
              min={0}
              aria-label="Minimum price"
            />
            <span className="shrink-0 text-muted-foreground">–</span>
            <Input
              type="number"
              placeholder={`₹${priceRange.max}`}
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                update({
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="h-9 text-sm"
              min={0}
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
