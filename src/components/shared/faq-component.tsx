import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/types";

interface FAQComponentProps {
  items: FAQItem[];
  title?: string;
}

export function FAQComponent({
  items,
  title = "Frequently Asked Questions",
}: FAQComponentProps) {
  return (
    <section className="section-padding">
      <div className="container-site">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
