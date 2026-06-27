import { generatePageMetadata } from "@/lib/seo";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategorySection } from "@/components/home/category-section";
import { BestSellers } from "@/components/home/best-sellers";
import { BrandStory } from "@/components/home/brand-story";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BenefitsSection } from "@/components/home/benefits-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { HomeCtaSection } from "@/components/home/home-cta-section";
import { FAQSection } from "@/components/home/faq-section";
import {
  benefitFeatures,
  categoryCards,
  faqItems,
  heroSlides,
  howItWorksSteps,
  testimonials,
  whyChooseUsFeatures,
} from "@/data/home-content";

export const metadata = generatePageMetadata({
  title: "Red Light Therapy Helmet & Hair Growth Devices for Home Use",
  description:
    "Shop Crownmate red light therapy helmet, HF Wand & Scalp Massager in India. 40 laser diodes, 20-minute sessions, free shipping. Science-backed hair growth at home.",
  path: "/",
  keywords: [
    "red light therapy helmet India",
    "buy red light therapy helmet India",
    "hair growth device India",
    "LLLT helmet India",
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroBanner slides={heroSlides} />
      <CategorySection cards={categoryCards} />
      <BestSellers />
      <BrandStory />
      <HowItWorksSection steps={howItWorksSteps} />
      <BenefitsSection features={benefitFeatures} />
      <WhyChooseUs features={whyChooseUsFeatures} />
      <TestimonialsSection testimonials={testimonials} />
      <HomeCtaSection />
      <FAQSection items={faqItems} />
    </>
  );
}
