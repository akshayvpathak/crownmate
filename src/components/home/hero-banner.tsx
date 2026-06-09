"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Brain,
  Sparkles,
  Heart,
  Droplets,
  Flower2,
  Eye,
} from "lucide-react";
import { heroSlides } from "@/data/home-content";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

const benefitIcons: Record<string, React.ReactNode> = {
  brain: <Brain className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  droplet: <Droplets className="h-5 w-5" />,
  flower: <Flower2 className="h-5 w-5" />,
  eye: <Eye className="h-5 w-5" />,
};

export function HeroBanner() {
  return (
    <section aria-label="Hero banner" className="relative bg-[#834fd9]">
      {/* Zigzag border between header and hero */}
      <div className="hero-zigzag-top bg-white" aria-hidden />

      <Carousel opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative bg-[#834fd9]">
                {/* Hero image — full bleed on mobile */}
                <div className="relative mx-auto aspect-[4/5] w-full max-h-[70vh] md:aspect-[16/9] md:max-h-[650px]">
                  {slide.image && (
                    <Image
                      src={slide.mobileImage ?? slide.image}
                      alt={slide.title}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover object-top"
                    />
                  )}
                  {/* Bottom gradient overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                      background:
                        "linear-gradient(to top, #834fd9 10%, rgba(131,79,217,0.85) 40%, transparent 100%)",
                    }}
                    aria-hidden
                  />
                </div>

                {/* Text content overlaid at bottom */}
                <div className="relative -mt-12 px-3 pb-8 pt-3 text-center text-white sm:-mt-16 sm:px-4 sm:pb-10 md:-mt-24 md:px-8 md:pb-16">
                  <p className="mb-1.5 text-xs font-medium sm:mb-2 sm:text-sm md:text-base">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mx-auto mb-4 max-w-lg text-[1.375rem] font-semibold leading-[1.15] sm:mb-6 sm:text-[1.75rem] md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>

                  {slide.benefits && (
                    <div className="mb-4 flex flex-wrap justify-center gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:gap-8">
                      {slide.benefits.map((b) => (
                        <div
                          key={b.label}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground sm:h-10 sm:w-10 md:h-12 md:w-12">
                            {benefitIcons[b.icon] ?? null}
                          </div>
                          <span className="max-w-[72px] text-[10px] font-semibold leading-tight sm:max-w-none sm:text-xs md:text-sm">
                            {b.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col items-stretch gap-2.5 px-2 sm:items-center sm:gap-3 sm:px-0 sm:flex-row sm:justify-center">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full min-w-0 bg-foreground text-white hover:bg-primary sm:w-auto sm:min-w-[160px]"
                      asChild
                    >
                      <Link href={slide.ctaLink}>
                        {slide.ctaText}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    {slide.subtitle && (
                      <p className="text-display text-sm italic text-white/90 md:text-base">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-4 left-0 right-0 md:bottom-8" />
      </Carousel>
    </section>
  );
}
