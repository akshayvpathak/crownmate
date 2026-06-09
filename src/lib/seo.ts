import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/assets";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;
  const pageDescription =
    description ??
    "Shop premium personal care, wellness, and grooming products from Frizty. India's first Electric Gua Sha, scalp massagers, trimmers & more.";
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? `${SITE_CONFIG.url}/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function generateProductJsonLd(product: {
  title: string;
  description: string;
  slug: string;
  images: string[];
  variants: { price: number }[];
}) {
  const price = product.variants[0]?.price ?? 0;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url: `${SITE_CONFIG.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: "Frizty" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price,
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/products/${product.slug}`,
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "customer service",
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}
