export const SITE_CONFIG = {
  name: "CrownMate",
  tagline: "Hair growth devices for home use",
  url: "https://www.crownmate.in",
  email: "support@crownmate.in",
  phone: "+91 90999 48630",
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
  "https://wa.me/919099948630?text=Hi%20CrownMate%2C%20I%20have%20a%20question%20about%20your%20products.";

export const SHIPPING_CONFIG = {
  freeThreshold: 499,
  flatRate: 49,
  deliveryDaysMin: 4,
  deliveryDaysMax: 7,
} as const;

export const ANNOUNCEMENT_MESSAGES = ["Free shipping on orders above ₹499"] as const;

export const PAYMENT_METHODS = ["visa", "mastercard", "rupay", "upi", "cod"] as const;
