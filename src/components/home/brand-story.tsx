import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-frizty">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={images.marketing.expressYourself}
              alt="Everyone should totally be able to express themselves"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="section-heading leading-snug">
              Everyone should totally be able to express themselves!
            </h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild className="min-w-[140px]">
                <Link href="/products">SHOP NOW</Link>
              </Button>
              <Button variant="outline" asChild className="min-w-[140px]">
                <Link href="/about">READ OUR STORY</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
