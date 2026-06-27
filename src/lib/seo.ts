import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/assets";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

// NOTE: Google has ignored the <meta name="keywords"> tag for ranking
// purposes since 2009 — this list has no effect on SEO either way, whether
// it has 5 entries or 50. Kept at full length below since it costs nothing
// to have and you wanted it restored. Real ranking comes from page content,
// backlinks, structured data (below), and Core Web Vitals — not this field.
const defaultKeywords = [
  // Broad — catches partial searches
  "red light therapy",
  "red light therapy for hair",
  "laser therapy for hair",
  "hair loss treatment",
  "hair regrowth device",

  // Mid — stronger intent
  "red light therapy for hair loss",
  "laser hair growth device",
  "LLLT hair growth",
  "LED hair growth helmet",
  "laser cap for hair regrowth",
  "low level laser therapy hair",
  "photobiomodulation hair growth",

  // Product specific
  "red light therapy helmet",
  "laser hair growth helmet",
  "hair growth helmet",
  "scalp therapy device",
  "HF wand scalp",
  "high frequency wand hair",
  "microneedling scalp",
  "scalp massager electric",

  // Technical — informed buyers
  "650nm laser hair growth",
  "660nm red light hair therapy",
  "androgenetic alopecia treatment",
  "pattern baldness treatment",
  "hair thinning treatment",
  "hair follicle stimulation device",

  // India specific — your winning zone
  "red light therapy India",
  "red light therapy for hair India",
  "red light therapy for hair loss India",
  "red light therapy helmet India",
  "laser hair growth helmet India",
  "LLLT helmet India",
  "hair loss treatment at home India",
  "hair growth device India",
  "hair growth device home use India",
  "at home hair loss device India",
  "androgenetic alopecia treatment India",
  "pattern baldness treatment India",
  "hair thinning treatment India",
  "scalp therapy device India",
  "scalp massager India",
  "HF wand India",
  "laser cap for hair regrowth India",

  // Competitor alternatives — captures comparison searches
  "iRestore alternative India",
  "iRestore India",
  "CurrentBody alternative India",
  "affordable laser hair helmet India",
  "best red light helmet India",

  // Brand
  "Crownmate",
  "Crownmate RedLight Helmet",
  "Crownmate HF Wand",
  "Crownmate scalp massager",
];

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords = [],
}: SEOProps): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;

  const pageDescription =
    description ??
    "Shop Crownmate hair growth devices in India — RedLight Laser Helmet, HF Wand & Scalp Massager. Science-backed red light therapy for hair loss. Free shipping across India.";

  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? "/og-image.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultKeywords, ...keywords],
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
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

// Returns a date string exactly one year from today, in YYYY-MM-DD format.
// This keeps priceValidUntil correct automatically — no more hardcoded dates
// that quietly go stale and cause Google to disregard the price.
function oneYearFromNow(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
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
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price,
      priceValidUntil: oneYearFromNow(),
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/crownmate/brand/logo.png`,
    foundingDate: "2024",
    description:
      "Crownmate makes at-home hair growth devices including red light therapy helmets, HF wands, and scalp massagers for India.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "opposite Godrej Garden City, Krishnadham Tenement, Jagatpur",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382470",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.10973085831179,
      longitude: 72.55077482207412,
    },
    // Open Mon–Sat, 10:00–18:30. Closed Sunday.
    // (Previously this was missing Saturday and closed an hour and a half early — fixed.)
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:30",
      },
    ],
    sameAs: Object.values(SITE_CONFIG.social),
  };
}
