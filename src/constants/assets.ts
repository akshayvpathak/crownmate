export const SITE_CONFIG = {
  name: "CrownMate",
  tagline: "Hair growth devices for home use",
  url: "https://www.crownmate.in",
  email: "support@crownmate.in",
  phone: "+91 97120 78733",
  address: "Pan-India Shipping",
  supportHours: "Mon–Sat, 10am–7pm IST",
  social: {
    facebook: "https://www.facebook.com/crownmate",
    instagram: "https://www.instagram.com/crownmate",
    linkedin: "https://www.linkedin.com/company/crownmate",
    youtube: "https://www.youtube.com/@crownmate",
  },
} as const;

export const WHATSAPP_URL =
  "https://wa.me/919712078733?text=Hi%20CrownMate%2C%20I%20need%20help%20with%20";

export const SHIPPING_CONFIG = {
  freeThreshold: 499,
  flatRate: 49,
  deliveryDaysMin: 4,
  deliveryDaysMax: 7,
} as const;

export const DISCOUNT_TIERS = [
  { threshold: 799, label: "5% Off", gift: false },
  { threshold: 1450, label: "10% Off", gift: false },
  { threshold: 2999, label: "15% Off", gift: true },
] as const;

export const ANNOUNCEMENT_MESSAGES = ["Free shipping on orders above ₹499"] as const;

export const PAYMENT_METHODS = ["visa", "mastercard", "rupay", "upi", "cod"] as const;
