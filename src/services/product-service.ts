import type { Product } from "@/types";
import productsData from "@/data/products.json";

const products = productsData as Product[];

const COLLECTION_SLUGS: Record<string, string[]> = {
  "shop-all": products.map((p) => p.slug),
  "best-sellers": products.map((p) => p.slug),
  "redlight-helmet": ["laser-hair-growth-helmet"],
  "hf-wand": ["high-frequency-wand"],
  "scalp-massager": ["electric-scalp-massager"],
};

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCollection(
  collectionSlug: string,
): Promise<Product[]> {
  const slugs = COLLECTION_SLUGS[collectionSlug] ?? products.map((p) => p.slug);
  return products.filter((p) => slugs.includes(p.slug));
}

export async function getBestSellers(): Promise<Product[]> {
  return products;
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  return products.filter((p) => p.slug !== slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
