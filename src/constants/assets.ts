export const CROWNMATE_BASE = "https://www.crownmate.in";

export const SITE_CONFIG = {
  name: "CrownMate",
  tagline: "Hair Growth Devices — Science Meets Simplicity",
  url: "https://www.crownmate.in",
  email: "support@crownmate.in",
  phone: "+91 97120 78733",
  address: "Pan-India Shipping",
  social: {
    facebook: "https://www.facebook.com/crownmate",
    instagram: "https://www.instagram.com/crownmate",
    linkedin: "https://www.linkedin.com/company/crownmate",
    youtube: "https://www.youtube.com/@crownmate",
  },
} as const;

export const DISCOUNT_TIERS = [
  { threshold: 799, label: "5% Off", gift: false },
  { threshold: 1450, label: "10% Off", gift: false },
  { threshold: 2999, label: "15% Off", gift: true },
] as const;

export const ANNOUNCEMENT_MESSAGES = ["Free shipping on orders above ₹499"] as const;

export const PAYMENT_METHODS = ["visa", "mastercard", "rupay", "upi", "cod"] as const;
