export const CDN_BASE = "https://friztyretail.com/cdn/shop/files";
export const SHOPIFY_CDN = "https://cdn.shopify.com/s/files/1/0688/0926/1357/files";

export const SITE_CONFIG = {
  name: "Frizty",
  tagline: "Smart Self-Care Tools. Real Results",
  url: "https://friztyretail.com",
  email: "Info@friztyretail.com",
  phone: "+91 97120 78733",
  address:
    "1st floor, liberty industrieal park, 34, to, Laskana-Kholvad Rd, next to shakti industries, Laskana, Surat, Gujarat 394180",
  social: {
    facebook: "https://www.facebook.com/friztyretail",
    instagram: "https://www.instagram.com/friztyretail",
    linkedin: "https://www.linkedin.com/company/frizty",
    youtube: "https://www.youtube.com/@friztyretail",
  },
} as const;

export const DISCOUNT_TIERS = [
  { threshold: 1099, label: "5% Off", gift: false },
  { threshold: 2099, label: "10% Off + Free Gift", gift: true },
  { threshold: 3099, label: "15% Off + Free Gift", gift: true },
] as const;

export const ANNOUNCEMENT_MESSAGES = [
  "Buy 1 & Get Extra 5% Off !",
  "Buy 2 & Get Extra 10% Off !",
  "Buy 3 & Get Extra 15% Off !",
] as const;

export const PAYMENT_METHODS = ["visa", "mastercard", "rupay", "upi", "cod"] as const;
