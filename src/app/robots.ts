import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/assets";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/order-confirmation"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
