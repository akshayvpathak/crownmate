import { images } from "@/data/images";
import type { CategoryCard, Feature, HeroSlide, Testimonial } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "gua-sha",
    eyebrow: "India's First Electric Gua Sha",
    title: "All in one Skincare Solution",
    subtitle: "Upgrade Your Skincare Routine!",
    ctaText: "SHOP NOW",
    ctaLink: "/products/frizty-electric-gua-sha-face-massager",
    image: images.hero.guaShaDesktop,
    mobileImage: images.hero.guaShaMobile,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "droplet", label: "Boosts Glow" },
      { icon: "flower", label: "Relieves Tension" },
      { icon: "eye", label: "Reduces Puffiness" },
    ],
  },
  {
    id: "head-massager",
    eyebrow: "India's First Head Massager",
    title: "Your Ultimate Relaxation Partner",
    subtitle: "Upgrade Your Self-Care Routine!",
    ctaText: "SHOP NOW",
    ctaLink: "/products/scalp-massager",
    image: images.hero.headMassager,
    mobileImage: images.hero.headMassager,
    backgroundColor: "#834fd9",
    benefits: [
      { icon: "brain", label: "Stress Relief" },
      { icon: "sparkles", label: "Better Sleep" },
      { icon: "heart", label: "Scalp Health" },
    ],
  },
];

export const frequentlyBoughtTogetherSlugs = [
  "frizty-electric-gua-sha-face-massager-electric-scalp-massage",
  "4-in-1-bikini-trimmer-head-masager-gua-sha-face-massager",
  "scalp-massager",
  "bikini-trimmer-and-shaver-for-women",
  "frizty-ultimate-callus-remover-hydrating-gel-combo-smooth-feet-made-easy",
  "frizty-pill-organizer",
  "frizty-medicine-organizer-3-times-a-day",
  "exfoliating-foot-peel-mask",
  "rosemary-essential-hair-oil",
];

export const categoryCards: CategoryCard[] = [
  {
    id: "1",
    title: "Personal Care",
    slug: "personal-care",
    image: images.categories.personalCare,
    itemCount: 7,
  },
  {
    id: "2",
    title: "Pill Organizer",
    slug: "pill-organizer",
    image: images.categories.pillOrganizer,
    itemCount: 2,
  },
  {
    id: "3",
    title: "Essential Oil",
    slug: "essential-oil",
    image: images.categories.essentialOil,
    itemCount: 3,
  },
  {
    id: "4",
    title: "Face Massager",
    slug: "electric-gua-sha-massager",
    image: images.categories.faceMassager,
    itemCount: 1,
  },
  {
    id: "5",
    title: "Massager",
    slug: "massager",
    image: images.categories.massager,
    itemCount: 1,
  },
  {
    id: "6",
    title: "Trimmers",
    slug: "electric-trimmer",
    image: images.categories.trimmers,
    itemCount: 4,
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
    description: "Frizty's Promise",
    icon: "warranty",
  },
];

export const benefitFeatures: Feature[] = [
  {
    id: "1",
    title: "Trusted Quality",
    description: "Enjoy soothing relief with our portable massager and all products.",
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
    author: "Saurabh Dwivedi",
    content:
      "Absolutely love this head massager! It's gentle yet effective, boosting circulation and providing deep relaxation. Even my family members are hooked on it now. A must-have in every home!",
    image: images.testimonials.saurabh,
  },
  {
    id: "2",
    author: "Vibha Khatri",
    content:
      "This has genuinely improved my sleep quality. I use it nightly before bed, and the soothing sensations calm my mind instantly. So glad I discovered this little gem—definitely one of my favorite purchases.",
    image: images.testimonials.vibha,
  },
  {
    id: "3",
    author: "Aakash",
    content:
      "I started using this head massager after long workdays, and it instantly relaxes my scalp and clears my mind. The bristles are soft yet firm enough to stimulate blood flow. It feels like a mini spa session at home.",
    image: images.testimonials.aakash,
  },
  {
    id: "4",
    author: "Kashish",
    content:
      "This product made hair removal so much easier for me. No more waxing appointments or shaving cuts! I love how fast and smooth the trimming is—especially on my legs.",
    image: images.testimonials.kashish,
  },
  {
    id: "5",
    author: "Edwina gomez",
    content:
      "At first, I was skeptical, but the moment I used this on one side of my face—I could literally feel the difference. It was warm, soothing, and within minutes, my skin felt tighter, smoother, and more relaxed.",
    image: images.testimonials.edwina,
  },
  {
    id: "6",
    author: "Tanya Bakshi",
    content:
      "I've always been the kind of person who wants to be organized… but life gets in the way. I take multivitamins, iron tablets, and a few skin supplements daily, but I kept forgetting doses until I found the Frizty Pill Box.",
    image: images.testimonials.tanya,
  },
  {
    id: "7",
    author: "Ankita Deshmukh",
    content:
      "This feet mask is a game-changer! No scrubbing, no pain — just wear it and forget. I used it before my Goa trip and my feet looked flawless in sandals.",
    image: images.testimonials.ankita,
  },
];

export const faqItems = [
  {
    id: "1",
    question: "How quickly can I expect results?",
    answer:
      "Many users start noticing reduced puffiness and improved skin freshness within the first few uses. For best results, we recommend using the device for 10 minutes everyday, and with consistent use over time, many users start seeing visible improvements within 21 days.",
  },
  {
    id: "2",
    question: "Is it safe to use?",
    answer:
      "Yes. Frizty products are designed for safe and gentle use. The devices use controlled heat therapy, low-level vibration technology, and red light therapy, which are commonly used in professional skincare treatments.",
  },
  {
    id: "3",
    question: "What is the warranty policy?",
    answer:
      "All Frizty products come with a 1 Year Warranty covering any manufacturing defects. We also offer a 90-Days Money-Back Guarantee, so you can try the product with confidence.",
  },
  {
    id: "4",
    question: "What are the shipping and return policies?",
    answer:
      "We provide fast and reliable shipping across India. Orders are usually processed within 24 hours, and delivery typically takes 3 to 4 working days. If you receive a damaged or defective product, please contact our support team within 48 hours of delivery.",
  },
  {
    id: "5",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free shipping on all orders delivered across India. Arrives in 3-4 days.",
  },
];
