export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  available: boolean;
  sku: string;
  image?: string | null;
}

export interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  vendor: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  options: ProductOption[];
  reviewCount: number;
  rating: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  productCount: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice?: number | null;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  productSlug?: string;
  helpful?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  mobileImage?: string;
  backgroundColor: string;
  benefits?: { icon: string; label: string }[];
}

export interface CategoryCard {
  id: string;
  title: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  megaMenu?: boolean;
  image?: string;
  itemCount?: number;
}

export type ReviewSortOption =
  | "most-recent"
  | "highest-rating"
  | "lowest-rating"
  | "most-helpful";

export interface ShippingEstimate {
  method: string;
  cost: number;
  estimatedDays: string;
}
