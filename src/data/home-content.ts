import { images } from "@/data/images";
import type { CategoryCard, Feature, HeroSlide, Testimonial } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "redlight-helmet",
    eyebrow: "Red Light Therapy · 40 Laser Diodes",
    title: "Red Light Therapy for Hair Growth — at Home",
    ctaText: "SHOP NOW",
    ctaLink: "/products/laser-hair-growth-helmet",
    image: images.banners.helmet,
    mobileImage: images.hero.helmet,
    backgroundColor: "#e8dff5",
  },
  {
    id: "hf-wand",
    eyebrow: "High-Frequency Scalp Therapy",
    title: "Healthy Hair Starts At The Scalp",
    ctaText: "SHOP NOW",
    ctaLink: "/products/high-frequency-wand",
    image: images.banners.hfWand,
    mobileImage: images.hero.hfWand,
    backgroundColor: "#e8dff5",
  },
  {
    id: "pulse-pro",
    eyebrow: "Smart Scalp Massage Technology",
    title: "Relax Your Scalp. Support Healthier-Looking Hair.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/electric-scalp-massager",
    image: images.banners.massager,
    mobileImage: images.hero.massager,
    backgroundColor: "#e8dff5",
  },
  {
    id: "serum-stamp",
    eyebrow: "Precision Scalp Care",
    title: "Precision Scalp Care. Target Every Drop. Elevate Your Routine.",
    subtitle:
      "Advanced serum stamp technology designed for targeted scalp application.",
    ctaText: "SHOP NOW",
    ctaLink: "/products/serum-stamp",
    image: images.banners.serumStamp,
    mobileImage: images.hero.serumStamp,
    backgroundColor: "#e8dff5",
  },
];

export const frequentlyBoughtTogetherSlugs = [
  "laser-hair-growth-helmet",
  "high-frequency-wand",
  "electric-scalp-massager",
  "serum-stamp",
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
  {
    id: "4",
    title: "Serum Stamp",
    slug: "serum-stamp",
    image: images.categories.serumStamp,
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
  {
    id: "04",
    product: "Crownmate Serum Stamp™",
    productSlug: "serum-stamp",
    eyebrow: "140 needles · 10ml tank",
    title: "Serum infusion stamping",
    image: images.howItWorks.serumStamp,
    features: [
      {
        title: "Micro-channels for real absorption",
        description:
          "Fine needles open tiny paths in the scalp so serum reaches past the surface — not just pooling in your hair.",
      },
      {
        title: "Built-in delivery, no mess",
        description:
          "Fill the 10ml chamber, press the bottle, and stamp. Product flows through the head while you work — less waste, more even coverage.",
      },
      {
        title: "Pairs with everything else",
        description:
          "Use once or twice a week before bed. A lot of customers stamp first, then rotate helmet or wand nights. It's the step that makes serums worth the money.",
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
    description: "UPI and cards via Razorpay — secure checkout.",
    icon: "lock",
  },
  {
    id: "3",
    title: "Free shipping",
    description: "On all orders. Delivered to your door across India.",
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
  {
    id: "4",
    author: "Karan D.",
    location: "Pune",
    product: "Serum Stamp™",
    content:
      "I was sceptical but my minoxidil actually soaks in now instead of running down my forehead. Once a week, takes five minutes.",
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
    question: "Is LLLT red light therapy safe to use at home?",
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
      "We dispatch within 24 hours on most orders. Delivery is 4–7 working days depending on your pin code. Free shipping on all orders across India. Damaged on arrival? Tell us within 48 hours.",
  },
  {
    id: "5",
    question: "Which device should I buy first?",
    answer:
      "Helmet if thinning/shedding is the main worry. Wand if you want scalp stimulation plus facial use. Massager if you want something cheap and daily to start with. Serum Stamp if you already use a growth serum and want it to actually absorb. Not sure? WhatsApp us — we'll ask two questions and point you right.",
  },
  {
    id: "6",
    question: "How does Crownmate compare to iRestore or CurrentBody in India?",
    answer:
      "Crownmate is built for India — priced at ₹3,999, ships free across India within 24 hours, and has local support. iRestore and CurrentBody are imported brands that cost ₹30,000–₹80,000 with limited India availability. Both use similar LLLT technology at 650nm wavelength.",
  },
];
