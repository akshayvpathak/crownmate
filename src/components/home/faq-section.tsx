import { faqItems } from "@/data/home-content";
import { FAQComponent } from "@/components/shared/faq-component";

export function FAQSection() {
  return <FAQComponent items={faqItems} />;
}
