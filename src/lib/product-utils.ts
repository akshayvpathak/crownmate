import type { Product } from "@/types";

export type SortOption =
  | "featured"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export type StockFilter = "all" | "in-stock" | "out-of-stock";

export interface ProductFilterState {
  sort: SortOption;
  stock: StockFilter;
  minPrice: number | null;
  maxPrice: number | null;
}

export const defaultFilterState: ProductFilterState = {
  sort: "featured",
  stock: "all",
  minPrice: null,
  maxPrice: null,
};

export function getMinPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

export function isInStock(product: Product): boolean {
  return product.variants.some((v) => v.available);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "best-selling":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "price-asc":
      return sorted.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function filterProducts(
  products: Product[],
  filters: ProductFilterState,
): Product[] {
  return products.filter((product) => {
    const price = getMinPrice(product);
    const inStock = isInStock(product);

    if (filters.stock === "in-stock" && !inStock) return false;
    if (filters.stock === "out-of-stock" && inStock) return false;
    if (filters.minPrice !== null && price < filters.minPrice) return false;
    if (filters.maxPrice !== null && price > filters.maxPrice) return false;

    return true;
  });
}

export function applyProductFilters(
  products: Product[],
  filters: ProductFilterState,
): Product[] {
  return sortProducts(filterProducts(products, filters), filters.sort);
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map(getMinPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
