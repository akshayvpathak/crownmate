import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/assets";
import { getAdminBasePath, INTERNAL_ADMIN_PREFIX } from "@/lib/admin-path";

export default function robots(): MetadataRoute.Robots {
  const adminBase = getAdminBasePath();
  const disallow = [
    "/cart",
    "/checkout",
    "/order-confirmation",
    INTERNAL_ADMIN_PREFIX,
    `${INTERNAL_ADMIN_PREFIX}/`,
    "/login",
    "/signup",
    "/verify-email",
    "/account",
  ];

  if (adminBase !== INTERNAL_ADMIN_PREFIX) {
    disallow.push(adminBase, `${adminBase}/`);
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
