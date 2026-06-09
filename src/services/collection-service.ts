import type { Collection } from "@/types";
import collectionsData from "@/data/collections.json";

const collections = collectionsData as Collection[];

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return collections.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  const featured = ["redlight-helmet", "hf-wand", "scalp-massager"];
  return collections.filter((c) => featured.includes(c.slug));
}
