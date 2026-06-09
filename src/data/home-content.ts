import { images } from "@/data/images";
import type { CategoryCard, Feature, HeroSlide, Testimonial } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "redlight-helmet",
    eyebrow: "40 Medical-Grade Laser Diodes",
    title: "Support Healthier-Looking Hair at Home",
    subtitle: "Structured red-light scalp sessions in just 20 minutes.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/laser-hair-growth-helmet",
    image: images.hero.helmet,
    mobileImage: images.hero.helmet,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "LLLT Technology" },
      { icon: "droplet", label: "650nm Wavelength" },
      { icon: "brain", label: "Hands-Free Routine" },
    ],
  },
  {
    id: "hf-wand",
    eyebrow: "4-in-1 Neon Gas Electrode System",
    title: "Scalp Therapy & Targeted Facial Care",
    subtitle: "One wand for multiple treatment zones.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/high-frequency-wand",
    image: images.hero.hfWand,
    mobileImage: images.hero.hfWand,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "Scalp Purification" },
      { icon: "droplet", label: "Serum Synergy" },
      { icon: "flower", label: "Variable Intensity" },
    ],
  },
  {
    id: "pulse-pro",
    eyebrow: "Smart Scalp Massage Technology",
    title: "Relax Your Scalp. Support Healthier-Looking Hair.",
    subtitle: "Daily kneading massage with soft silicone nodes.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/electric-scalp-massager",
    image: images.hero.massager,
    mobileImage: images.hero.massager,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "Red Light Therapy" },
      { icon: "droplet", label: "Deep Scalp Stimulation" },
      { icon: "heart", label: "Relaxing Massage" },
    ],
  },
];

export const frequentlyBoughtTogetherSlugs = [
  "laser-hair-growth-helmet",
  "high-frequency-wand",
  "electric-scalp-massager",
];

export const categoryCards: CategoryCard[] = [
  {
    id: "1",
    title: "RedLight Helmet",
    slug: "redlight-helmet",
    image: images.categories.redlightHelmet,
    itemCount: 1,
  },
  {
    id: "2",
    title: "HF Wand",
    slug: "hf-wand",
    image: images.categories.hfWand,
    itemCount: 1,
  },
  {
    id: "3",
    title: "Scalp Massager",
    slug: "scalp-massager",
    image: images.categories.scalpMassager,
    itemCount: 1,
  },
];

export const howItWorksSteps = [
  {
    id: "01",
    product: "Crownmate RedLight Helmet™",
    productSlug: "laser-hair-growth-helmet",
    eyebrow: "40 Medical-Grade Laser Diodes",
    title: "LLLT Technology",
    image: images.howItWorks.helmet,
    features: [
      {
        title: "Light Penetration",
        description:
          "650nm red laser light penetrates the scalp dermis, reaching hair follicles deep beneath the surface.",
      },
      {
        title: "Cellular ATP Boost",
        description:
          "Stimulates mitochondria to produce ATP — the energy your hair cells need to stay in the active growth phase.",
      },
      {
        title: "Follicle Revival",
        description:
          "Awakens dormant follicles, extends the Anagen growth phase, and supports visibly thicker, denser hair over time.",
      },
    ],
  },
  {
    id: "02",
    product: "Crownmate High Frequency Wand™",
    productSlug: "high-frequency-wand",
    eyebrow: "4-in-1 Neon Gas Electrode System",
    title: "High-Frequency Electrode Therapy",
    image: images.howItWorks.hfWand,
    features: [
      {
        title: "Neon Ionization",
        description:
          "High-frequency current passes through neon gas, creating a therapeutic glow that stimulates blood flow to the scalp.",
      },
      {
        title: "Scalp Purification",
        description:
          "Generates enriched oxygen to eliminate bacteria and reduce inflammation that blocks healthy hair growth.",
      },
      {
        title: "Serum Synergy",
        description:
          "Increases scalp permeability so hair serums and oils absorb up to 5 times deeper for maximum effect.",
      },
    ],
  },
  {
    id: "03",
    product: "Crownmate Pulse Pro Massager™",
    productSlug: "electric-scalp-massager",
    eyebrow: "Portable Rechargeable Massager",
    title: "Deep-Kneading Scalp Massage",
    image: images.howItWorks.massager,
    features: [
      {
        title: "Circulation Boost",
        description:
          "Rhythmic kneading motions increase blood flow to follicles, delivering more oxygen and nutrients directly to hair roots.",
      },
      {
        title: "Scalp Detox",
        description:
          "Gently loosens product buildup, dead skin cells, and excess oil — creating a clean, healthy base for hair growth.",
      },
      {
        title: "Absorption Prep",
        description:
          "Use before applying serums or oils to dramatically improve how deep active ingredients penetrate the scalp.",
      },
    ],
  },
];

export const whyChooseUsFeatures: Feature[] = [
  {
    id: "1",
    title: "Made",
    subtitle: "with quality & durability",
    description: "",
    icon: "quality",
  },
  {
    id: "2",
    title: "Safe",
    subtitle: "to use on all skin types",
    description: "",
    icon: "safe",
  },
  {
    id: "3",
    title: "Smart",
    subtitle: "tech for next-level experience",
    description: "",
    icon: "smart",
  },
  {
    id: "4",
    title: "1 Year* Warranty",
    subtitle: "on all Products",
    description: "CrownMate's Promise",
    icon: "warranty",
  },
];

export const benefitFeatures: Feature[] = [
  {
    id: "1",
    title: "Trusted Quality",
    description:
      "Enjoy reliable performance with our professionally designed devices and all products.",
    icon: "shield",
  },
  {
    id: "2",
    title: "Secure Checkout",
    description: "Shop safely with our Secure Checkout, your privacy matters!",
    icon: "lock",
  },
  {
    id: "3",
    title: "Free Delivery",
    description: "Get free shipping on your order delivered to your doorstep!",
    icon: "truck",
  },
  {
    id: "4",
    title: "1 Year Warranty",
    description: "Enjoy peace of mind with our 1-Year Warranty on every product.",
    icon: "badge",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Rahul M.",
    content:
      "After regular sessions, I noticed less shedding and my routine became much more consistent.",
    image: undefined,
  },
  {
    id: "2",
    author: "Priya S.",
    content:
      "The multiple electrodes made it easy to use on scalp and face without changing my whole schedule.",
    image: undefined,
  },
  {
    id: "3",
    author: "Arjun K.",
    content:
      "Simple to use daily and it made applying oils and serum much more effective for me.",
    image: undefined,
  },
];

export const faqItems = [
  {
    id: "1",
    question: "How long before I see results with the RedLight Helmet?",
    answer:
      "Most users notice reduced shedding within 4 to 6 weeks. Visible regrowth and thickness improvements are typically seen between 12 and 16 weeks of consistent use, 3 times per week.",
  },
  {
    id: "2",
    question: "Is LLLT safe to use at home?",
    answer:
      "Yes. CrownMate devices are designed for safe home use. The RedLight Helmet uses low-level laser therapy at 650nm, a wavelength commonly used in professional scalp care routines.",
  },
  {
    id: "3",
    question: "What is the warranty policy?",
    answer:
      "All CrownMate products come with a 1 Year Warranty covering manufacturing defects. We also offer easy exchange and returns within our policy window.",
  },
  {
    id: "4",
    question: "What are the shipping and return policies?",
    answer:
      "We provide Pan-India delivery. Orders are usually processed within 24 hours, with delivery in 3 to 9 working days. Free shipping applies on orders above ₹499.",
  },
  {
    id: "5",
    question: "Which device should I start with?",
    answer:
      "Start with the device that matches your primary goal: RedLight Helmet for laser scalp support, HF Wand for scalp therapy and purification, or Pulse Pro Massager for daily massage and serum prep. Contact support if you need help choosing.",
  },
];
