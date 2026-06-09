import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/assets";
import productsData from "@/data/products.json";
import collectionsData from "@/data/collections.json";

const staticRoutes = [
  "",
  "/products",
  "/collections",
  "/about",
  "/how-it-works",
  "/faq",
  "/contact",
  "/terms-and-conditions",
  "/refund-policy",
  "/privacy-policy",
  "/shipping-policy",
  "/track-order",
  "/warranty-registration",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;

  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productEntries = productsData.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionEntries = collectionsData.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries, ...collectionEntries];
}
