import { FAQComponent } from "@/components/shared/faq-component";
import { faqItems } from "@/data/home-content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about CrownMate products, shipping, warranty, and returns.",
  path: "/faq",
});

export default function FAQPage() {
  return <FAQComponent items={faqItems} title="Questions we get a lot" />;
}
