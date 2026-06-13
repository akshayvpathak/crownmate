import Link from "next/link";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { Button } from "@/components/ui/button";

export function HomeCtaSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site text-center">
        <h2 className="text-xl font-bold md:text-2xl">
          Not sure which device to start with?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Tell us what you&apos;re dealing with — thinning, oily scalp, product buildup
          — and we&apos;ll point you to the right device.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <WhatsAppLink className="inline-flex">Chat on WhatsApp</WhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
