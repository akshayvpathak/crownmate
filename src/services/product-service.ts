import type { Product } from "@/types";
import productsData from "@/data/products.json";

const products = productsData as Product[];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCollection(
  collectionSlug: string,
): Promise<Product[]> {
  const collectionMap: Record<string, string[]> = {
    massager: [
      "scalp-massager",
      "frizty-electric-gua-sha-face-massager-electric-scalp-massage",
    ],
    "electric-gua-sha-massager": ["frizty-electric-gua-sha-face-massager"],
    "electric-trimmer": [
      "bikini-trimmer-and-shaver-for-women",
      "4-in-1-bikini-trimmer-head-masager",
      "4-in-1-bikini-trimmer-gua-sha-masager",
    ],
    "feet-care": [
      "feet-callus-remover-gel",
      "exfoliating-foot-peel-mask",
      "frizty-ultimate-callus-remover-hydrating-gel-combo-smooth-feet-made-easy",
    ],
    "heating-pad": ["frizty-heating-pad"],
    "pill-organizer": [
      "frizty-pill-organizer",
      "frizty-medicine-organizer-3-times-a-day",
    ],
    "essential-oil": ["rosemary-essential-hair-oil"],
    combo: [
      "4-in-1-bikini-trimmer-head-masager",
      "4-in-1-bikini-trimmer-head-masager-gua-sha-face-massager",
      "frizty-electric-gua-sha-face-massager-electric-scalp-massage",
      "ultimate-relaxation-combo-head-massager-rosemary-oil",
    ],
    "best-sellers": [
      "4-in-1-bikini-trimmer-head-masager",
      "frizty-ultimate-callus-remover-hydrating-gel-combo-smooth-feet-made-easy",
      "frizty-electric-gua-sha-face-massager",
      "scalp-massager",
      "bikini-trimmer-and-shaver-for-women",
    ],
    all: products.map((p) => p.slug),
    "shop-all": products.map((p) => p.slug),
  };

  const slugs = collectionMap[collectionSlug] ?? products.map((p) => p.slug);
  return products.filter((p) => slugs.includes(p.slug));
}

export async function getBestSellers(): Promise<Product[]> {
  const slugs = [
    "4-in-1-bikini-trimmer-head-masager",
    "frizty-ultimate-callus-remover-hydrating-gel-combo-smooth-feet-made-easy",
    "frizty-electric-gua-sha-face-massager",
    "scalp-massager",
    "bikini-trimmer-and-shaver-for-women",
    "frizty-electric-gua-sha-face-massager-electric-scalp-massage",
    "4-in-1-bikini-trimmer-head-masager-gua-sha-face-massager",
    "4-in-1-bikini-trimmer-gua-sha-masager",
  ];
  return products.filter((p) => slugs.includes(p.slug));
}

export async function getComboProducts(): Promise<Product[]> {
  const slugs = [
    "ultimate-relaxation-combo-head-massager-rosemary-oil",
    "exfoliating-foot-peel-mask",
    "4-in-1-bikini-trimmer-head-masager-gua-sha-face-massager",
    "frizty-electric-gua-sha-face-massager-electric-scalp-massage",
    "4-in-1-bikini-trimmer-gua-sha-masager",
    "4-in-1-bikini-trimmer-head-masager",
  ];
  return products.filter((p) => slugs.includes(p.slug));
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
