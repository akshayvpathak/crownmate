import Image from "next/image";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-xl bg-white p-5 shadow-sm md:p-6",
        className,
      )}
    >
      {testimonial.image && (
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            sizes="40px"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}
      <blockquote className="flex-1 text-[13px] leading-relaxed text-foreground md:text-sm">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
      <footer className="text-xs md:text-sm">
        <cite className="font-semibold not-italic">{testimonial.author}</cite>
        {(testimonial.location || testimonial.product) && (
          <p className="mt-0.5 text-muted-foreground">
            {[testimonial.location, testimonial.product].filter(Boolean).join(" · ")}
          </p>
        )}
      </footer>
    </article>
  );
}
