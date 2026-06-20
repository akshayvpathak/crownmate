export const SITE_CONFIG = {
  name: "CrownMate",
  tagline: "Hair growth devices for home use",
  url: "https://www.crownmate.in",
  email: "support@crownmate.in",
  phone: "+91 90999 48630",
  address: "Ahmedabad, Gujarat",
  shippingCoverage: "Pan India",
  supportHours: "Mon–Sat, 10am–7pm IST",
  social: {
    facebook: "https://www.facebook.com/crownmate",
    instagram: "https://www.instagram.com/crownmate",
    linkedin: "https://www.linkedin.com/company/crownmate",
    youtube: "https://www.youtube.com/@crownmate",
  },
} as const;

export const WHATSAPP_PHONE = "919099948630";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hi CrownMate, I have a question about your products.")}`;

export const TEL_PHONE = `tel:+${WHATSAPP_PHONE}`;

export const SHIPPING_CONFIG = {
  freeThreshold: 0,
  flatRate: 49,
  deliveryDaysMin: 4,
  deliveryDaysMax: 7,
} as const;

export const ANNOUNCEMENT_MESSAGES = [
  "Your Mate for a Healthier Crown",
  "Free Shipping Across India",
  "5% OFF with WELCOME5",
  "Red Light Therapy Technology",
  "Designed for Stronger, Healthier Hair",
] as const;

export const PAYMENT_METHODS = ["visa", "mastercard", "rupay", "upi", "cod"] as const;
