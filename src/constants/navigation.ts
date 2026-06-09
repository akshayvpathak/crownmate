import type { NavItem } from "@/types";
import { images } from "@/data/images";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  {
    label: "Shop",
    href: "/products",
    megaMenu: true,
    children: [
      {
        label: "RedLight Helmet",
        href: "/collections/redlight-helmet",
        image: images.categories.redlightHelmet,
        itemCount: 1,
      },
      {
        label: "HF Wand",
        href: "/collections/hf-wand",
        image: images.categories.hfWand,
        itemCount: 1,
      },
      {
        label: "Scalp Massager",
        href: "/collections/scalp-massager",
        image: images.categories.scalpMassager,
        itemCount: 1,
      },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  {
    label: "Support",
    href: "/contact",
    children: [
      { label: "Track Your Order", href: "/track-order" },
      { label: "Warranty Registration", href: "/warranty-registration" },
      { label: "Customer Care", href: "/contact" },
    ],
  },
];

export const footerShopLinks = [
  { label: "RedLight Helmet", href: "/collections/redlight-helmet" },
  { label: "HF Wand", href: "/collections/hf-wand" },
  { label: "Scalp Massager", href: "/collections/scalp-massager" },
  { label: "All Products", href: "/products" },
];

export const footerBrandLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerSupportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Track Your Order", href: "/track-order" },
  { label: "Customer Care", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Shipping Policy", href: "/terms-and-conditions" },
  { label: "Cancellation & Refunds", href: "/refund-policy" },
  { label: "Sales Policy", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-and-conditions" },
];
