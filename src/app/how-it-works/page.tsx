import Link from "next/link";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { generatePageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = generatePageMetadata({
  title: "How It Works",
  description:
    "How the RedLight Helmet, HF Wand, and Pulse Pro Massager fit into a weekly scalp routine.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-frizty text-center">
          <h1 className="text-2xl font-bold md:text-4xl">How it works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Short version: laser helmet for long-term follicle support, HF wand for
            scalp stimulation, massager for daily prep. Here&apos;s the longer version.
          </p>
        </div>
      </section>
      <HowItWorksSection />
      <section className="section-padding bg-white">
        <div className="container-frizty text-center">
          <h2 className="text-xl font-bold md:text-2xl">Not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Message us on WhatsApp with what you&apos;re dealing with — thinning, oily
            scalp, product buildup — and we&apos;ll tell you straight which device makes
            sense first.
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
