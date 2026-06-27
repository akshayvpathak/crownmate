import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/services/product-service";
import { getReviews } from "@/services/review-service";
import {
  generatePageMetadata,
  generateProductJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { ProductDetail } from "@/components/product/product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const isHelmet = slug === "laser-hair-growth-helmet";

  return generatePageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${slug}`,
    image: product.images[0],
    keywords: isHelmet
      ? [
          "buy red light helmet India",
          "red light hair helmet price India",
          "LLLT helmet buy online India",
          "laser hair growth helmet price",
          "best red light helmet for hair loss India",
          "40 laser diode helmet India",
          "650nm laser helmet India",
        ]
      : [],
  });
}

const helmetFaqs = [
  {
    question: "Does red light therapy work for hair loss?",
    answer:
      "Yes. Low-level laser therapy (LLLT) at 650nm stimulates hair follicles, improves scalp blood flow, and has been shown in clinical studies to increase hair growth by 35% compared to placebo. Results are most consistent for androgenetic alopecia (pattern hair loss) in men and women.",
  },
  {
    question: "What is the price of a red light helmet for hair growth in India?",
    answer:
      "The Crownmate RedLight Helmet is priced at ₹3,999 in India with free shipping across the country — significantly more affordable than imported options like iRestore or CurrentBody which cost ₹30,000–₹80,000 and have limited India availability.",
  },
  {
    question: "Is LLLT safe to use at home?",
    answer:
      "Yes. It uses 650nm low-level laser therapy — the same wavelength used in professional clinic devices. It is non-invasive, painless, and safe for home use. Follow the recommended 20-minute session limit and avoid use on broken or irritated skin.",
  },
  {
    question: "How long before I see results from red light therapy?",
    answer:
      "Most users notice reduced hair shedding around week 4–6. Visible thickness and new growth typically appear after 12–16 weeks of consistent use — three sessions per week.",
  },
  {
    question: "Does red light therapy work for Indian hair types?",
    answer:
      "Yes. LLLT works at the follicle level regardless of hair type, texture, or ethnicity. The Crownmate RedLight Helmet is designed for Indian scalp conditions and climate.",
  },
  {
    question: "How is Crownmate different from iRestore?",
    answer:
      "Crownmate is an India-based brand with free shipping across India, priced at ₹3,999. iRestore is a US brand that costs ₹30,000–₹80,000 and is difficult to import to India. Both use LLLT technology at similar wavelengths.",
  },
  {
    question: "How often should I use the RedLight Helmet?",
    answer:
      "Three times per week, 20 minutes per session. More frequent use does not improve results — consistency over 3–4 months is what matters.",
  },
  {
    question: "Can women use the RedLight Helmet?",
    answer:
      "Absolutely. The Crownmate RedLight Helmet works equally well for men and women experiencing thinning or early-stage hair loss.",
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, relatedProducts] = await Promise.all([
    getReviews(slug),
    getRelatedProducts(slug),
  ]);

  const jsonLd = generateProductJsonLd(product);
  const isHelmet = slug === "laser-hair-growth-helmet";
  const faqJsonLd = isHelmet ? generateFaqJsonLd(helmetFaqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ProductDetail
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
