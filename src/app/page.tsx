import { HeroBanner } from "@/components/home/hero-banner";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedShowcase } from "@/components/home/featured-showcase";
import { BestSellers } from "@/components/home/best-sellers";
import { BrandStory } from "@/components/home/brand-story";
import { CombosSection } from "@/components/home/combos-section";
import { PressSection } from "@/components/home/press-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BenefitsSection } from "@/components/home/benefits-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <FeaturedShowcase />
      <BestSellers />
      <BrandStory />
      <CombosSection />
      <PressSection />
      <WhyChooseUs />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
