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

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <BestSellers />
      <BrandStory />
      <HowItWorksSection />
      <BenefitsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <HomeCtaSection />
      <FAQSection />
    </>
  );
}
