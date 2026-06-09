import type { NavItem } from "@/types";
import { images } from "@/data/images";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  {
    label: "Personal care",
    href: "/collections/personal-care",
    megaMenu: true,
    children: [
      {
        label: "Massager",
        href: "/collections/massager",
        image: images.categories.massager,
        itemCount: 1,
      },
      {
        label: "Face Massager",
        href: "/collections/electric-gua-sha-massager",
        image: images.categories.faceMassager,
        itemCount: 1,
      },
      {
        label: "Electric Trimmer",
        href: "/collections/electric-trimmer",
        image: images.categories.trimmers,
        itemCount: 4,
      },
      {
        label: "Feet care",
        href: "/collections/feet-care",
        image: images.categories.feetCare,
        itemCount: 3,
      },
      {
        label: "Heating Pad",
        href: "/collections/heating-pad",
        image: images.categories.heatingPad,
        itemCount: 1,
      },
    ],
  },
  { label: "Pill Organizer", href: "/collections/pill-organizer" },
  { label: "Essential oil", href: "/collections/essential-oil" },
  { label: "Combo", href: "/collections/combo" },
  { label: "About Us", href: "/about" },
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
  { label: "Massager", href: "/collections/massager" },
  { label: "Face Massager", href: "/collections/electric-gua-sha-massager" },
  { label: "Electric Trimmer", href: "/collections/electric-trimmer" },
  { label: "Feet care", href: "/collections/feet-care" },
  { label: "Heating Pad", href: "/collections/heating-pad" },
];

export const footerBrandLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerSupportLinks = [
  { label: "Track Your Order", href: "/track-order" },
  { label: "Warranty Registration", href: "/warranty-registration" },
  { label: "Customer Care", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Return policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/terms-and-conditions" },
  { label: "Terms of Service", href: "/terms-and-conditions" },
];
