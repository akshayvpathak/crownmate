import { unstable_noStore as noStore } from "next/cache";
import { loadProducts } from "@backend/lib/product-store";
import type { Product } from "@/types";

const COLLECTION_SLUGS: Record<string, string[]> = {
  "shop-all": [
    "laser-hair-growth-helmet",
    "high-frequency-wand",
    "electric-scalp-massager",
  ],
  "best-sellers": [
    "laser-hair-growth-helmet",
    "high-frequency-wand",
    "electric-scalp-massager",
  ],
  "redlight-helmet": ["laser-hair-growth-helmet"],
  "hf-wand": ["high-frequency-wand"],
  "scalp-massager": ["electric-scalp-massager"],
};

async function readProducts(): Promise<Product[]> {
  noStore();
  return loadProducts();
}

export async function getProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCollection(
  collectionSlug: string,
): Promise<Product[]> {
  const products = await readProducts();
  const slugs = COLLECTION_SLUGS[collectionSlug] ?? products.map((p) => p.slug);
  return products.filter((p) => slugs.includes(p.slug));
}

export async function getBestSellers(): Promise<Product[]> {
  return readProducts();
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  const products = await readProducts();
  return products.filter((p) => p.slug !== slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await readProducts();
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
