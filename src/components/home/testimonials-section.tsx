"use client";

import { testimonials } from "@/data/home-content";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-frizty">
        <h2 className="section-heading mb-6 text-center md:mb-10">
          What customers actually say
        </h2>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-3 md:-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="basis-[85%] pl-3 sm:basis-[60%] md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <TestimonialCard testimonial={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-3" />
          <CarouselNext className="hidden md:flex -right-3" />
        </Carousel>
      </div>
    </section>
  );
}
