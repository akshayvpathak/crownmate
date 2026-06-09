import Link from "next/link";
import { WHATSAPP_URL } from "@/constants/assets";
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
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
