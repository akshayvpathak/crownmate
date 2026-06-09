import Link from "next/link";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { generatePageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = generatePageMetadata({
  title: "How It Works",
  description:
    "Learn how CrownMate's RedLight Helmet, HF Wand, and Pulse Pro Massager work together for scalp care and hair growth support.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-frizty text-center">
          <h1 className="text-2xl font-bold md:text-4xl">How CrownMate Works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Three focused technologies designed to fit into a simple weekly self-care
            routine. Start with one device and expand as your goals evolve.
          </p>
        </div>
      </section>
      <HowItWorksSection />
      <section className="section-padding bg-white">
        <div className="container-frizty text-center">
          <h2 className="text-xl font-bold md:text-2xl">
            Start with one device today, then build your full routine.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            If you are unsure which device fits your goal, contact support and we will
            help you choose.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
