"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

function HeroDots() {
  const { selectedIndex, scrollSnaps, scrollTo } = useCarousel();

  return (
    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 md:bottom-4">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => scrollTo(index)}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span
            className={cn(
              "block rounded-full transition-all",
              selectedIndex === index
                ? "h-2.5 w-2.5 border-2 border-primary bg-transparent"
                : "h-2 w-2 bg-primary/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function HeroBanner({ slides }: { slides: HeroSlide[] }) {
  return (
    <section aria-label="Hero banner" className="relative bg-[#e8dff5]">
      <div className="hero-zigzag-top bg-white" aria-hidden />

      <Carousel opts={{ loop: true }} className="relative">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <Link
                href={slide.ctaLink}
                className="relative block aspect-[1024/455] w-full overflow-hidden bg-[#e8dff5]"
                aria-label={`${slide.title} — ${slide.ctaText}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="ghost"
          className="left-2 top-1/2 h-9 w-9 -translate-y-1/2 border-0 bg-white/80 text-foreground shadow-md hover:bg-white md:left-4 md:h-10 md:w-10"
        />
        <CarouselNext
          variant="ghost"
          className="right-2 top-1/2 h-9 w-9 -translate-y-1/2 border-0 bg-white/80 text-foreground shadow-md hover:bg-white md:right-4 md:h-10 md:w-10"
        />
        <HeroDots />
      </Carousel>
    </section>
  );
}
