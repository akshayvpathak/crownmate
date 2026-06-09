import { images } from "@/data/images";
import type { CategoryCard, Feature, HeroSlide, Testimonial } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "redlight-helmet",
    eyebrow: "40 laser diodes · 650nm",
    title: "Red-light scalp sessions at home",
    subtitle: "20 minutes, three nights a week. No clinic queue.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/laser-hair-growth-helmet",
    image: images.hero.helmet,
    mobileImage: images.hero.helmet,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "LLLT" },
      { icon: "droplet", label: "650nm" },
      { icon: "brain", label: "Hands-free" },
    ],
  },
  {
    id: "hf-wand",
    eyebrow: "4 glass electrodes included",
    title: "Scalp + face in one wand",
    subtitle: "Short sessions. Swap the head, move on.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/high-frequency-wand",
    image: images.hero.hfWand,
    mobileImage: images.hero.hfWand,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "Scalp" },
      { icon: "droplet", label: "Serum prep" },
      { icon: "flower", label: "Adjustable" },
    ],
  },
  {
    id: "pulse-pro",
    eyebrow: "IPX7 · rechargeable",
    title: "A scalp massage you'll actually use",
    subtitle: "5 minutes in the shower. Silicone nodes, not hard plastic.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/electric-scalp-massager",
    image: images.hero.massager,
    mobileImage: images.hero.massager,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "sparkles", label: "Waterproof" },
      { icon: "droplet", label: "Kneading" },
      { icon: "heart", label: "Portable" },
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
    eyebrow: "40 laser diodes",
    title: "Low-level laser therapy",
    image: images.howItWorks.helmet,
    features: [
      {
        title: "Light gets to the follicle",
        description:
          "650nm red laser reaches into the scalp — not just the surface. That's the wavelength clinics use for LLLT.",
      },
      {
        title: "More energy for growing cells",
        description:
          "The light nudges mitochondria to make more ATP. Healthier follicles tend to stay in the growth phase longer.",
      },
      {
        title: "Consistency beats intensity",
        description:
          "You won't see change in a week. Stick to 20 minutes, three times a week, for a few months — that's when people start noticing thickness.",
      },
    ],
  },
  {
    id: "02",
    product: "Crownmate High Frequency Wand™",
    productSlug: "high-frequency-wand",
    eyebrow: "Neon gas electrode",
    title: "High-frequency scalp therapy",
    image: images.howItWorks.hfWand,
    features: [
      {
        title: "Warmth and circulation",
        description:
          "The electrode creates a gentle ozone-rich glow. Scalp feels tingly and warm — blood flow picks up in that area.",
      },
      {
        title: "Cleaner scalp surface",
        description:
          "Oxygen from the reaction helps with bacteria and buildup that can clog follicles. Useful if your scalp runs oily.",
      },
      {
        title: "Better product absorption",
        description:
          "Use before your oil or serum. A warmed-up scalp takes product in more evenly — customers tell us they use less product over time.",
      },
    ],
  },
  {
    id: "03",
    product: "Crownmate Pulse Pro Massager™",
    productSlug: "electric-scalp-massager",
    eyebrow: "Silicone kneading nodes",
    title: "Daily scalp massage",
    image: images.howItWorks.massager,
    features: [
      {
        title: "Blood flow without effort",
        description:
          "The nodes rotate and knead — you don't have to tire out your fingers doing it manually.",
      },
      {
        title: "Loosens buildup",
        description:
          "Dry shampoo, wax, excess oil — a few minutes of massage breaks that up before you wash or oil.",
      },
      {
        title: "Prep step for everything else",
        description:
          "Massage first, then helmet or wand or serum. It's the cheapest way to make the rest of your routine work harder.",
      },
    ],
  },
];

export const whyChooseUsFeatures: Feature[] = [
  {
    id: "1",
    title: "Built to last",
    subtitle: "solid hardware, not gimmicks",
    description: "",
    icon: "quality",
  },
  {
    id: "2",
    title: "Gentle by design",
    subtitle: "start low, build up",
    description: "",
    icon: "safe",
  },
  {
    id: "3",
    title: "Actually usable",
    subtitle: "short sessions, clear instructions",
    description: "",
    icon: "smart",
  },
  {
    id: "4",
    title: "1 Year Warranty",
    subtitle: "on every device",
    description: "we stand behind what we ship",
    icon: "warranty",
  },
];

export const benefitFeatures: Feature[] = [
  {
    id: "1",
    title: "Tested before dispatch",
    description:
      "Every unit goes through a basic function check. If something's off, we catch it.",
    icon: "shield",
  },
  {
    id: "2",
    title: "Secure payments",
    description: "UPI, cards, COD — whatever you prefer. Razorpay handles checkout.",
    icon: "lock",
  },
  {
    id: "3",
    title: "Free shipping",
    description: "On orders above ₹499. Delivered to your door across India.",
    icon: "truck",
  },
  {
    id: "4",
    title: "1-year warranty",
    description: "Manufacturing defects covered. WhatsApp us if anything breaks early.",
    icon: "badge",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Rahul M.",
    location: "Mumbai",
    product: "RedLight Helmet™",
    content:
      "Honestly thought it would be another gadget I'd stop using. Six weeks in, way less hair in the shower drain. I do it while watching cricket.",
  },
  {
    id: "2",
    author: "Priya S.",
    location: "Bengaluru",
    product: "HF Wand™",
    content:
      "I use the comb attachment on my scalp and the round one on my face. Takes maybe 10 minutes total. My bhringraj oil actually feels like it's going in now.",
  },
  {
    id: "3",
    author: "Arjun K.",
    location: "Delhi",
    product: "Pulse Pro Massager™",
    content:
      "Keeps it in the bathroom. Quick massage before bed — helps me wind down and my scalp isn't as tight in the mornings.",
  },
];

export const faqItems = [
  {
    id: "1",
    question: "When will I see results with the RedLight Helmet?",
    answer:
      "Less shedding around 4–6 weeks if you're doing three sessions a week. Visible thickness usually needs 3–4 months. Hair grows slowly — anyone promising overnight results is selling something else.",
  },
  {
    id: "2",
    question: "Is LLLT safe to use at home?",
    answer:
      "Yes. It's the same low-level laser approach used in clinics, just in a helmet you wear at home. Don't exceed 20 minutes per session and skip it on irritated skin.",
  },
  {
    id: "3",
    question: "What's the warranty?",
    answer:
      "One year on manufacturing defects. Message support@crownmate.in with your order number and we'll sort it out.",
  },
  {
    id: "4",
    question: "Shipping and returns?",
    answer:
      "We dispatch within 24 hours on most orders. Delivery is 4–7 working days depending on your pin code. Free shipping above ₹499. Damaged on arrival? Tell us within 48 hours.",
  },
  {
    id: "5",
    question: "Which device should I buy first?",
    answer:
      "Helmet if thinning/shedding is the main worry. Wand if you want scalp stimulation plus facial use. Massager if you want something cheap and daily to start with. Not sure? WhatsApp us — we'll ask two questions and point you right.",
  },
];
