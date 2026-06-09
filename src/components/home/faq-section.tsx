import { FAQComponent } from "@/components/shared/faq-component";
import type { FAQItem } from "@/types";

export function FAQSection({ items }: { items: FAQItem[] }) {
  return <FAQComponent items={items} />;
}
