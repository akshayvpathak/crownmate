"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function ProductGallery({
  images,
  title,
  selectedIndex,
  onSelect,
}: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();

  const handleCarouselSelect = useCallback(() => {
    if (!api) return;
    onSelect(api.selectedScrollSnap());
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    handleCarouselSelect();
    api.on("select", handleCarouselSelect);
    return () => {
      api.off("select", handleCarouselSelect);
    };
  }, [api, handleCarouselSelect]);

  useEffect(() => {
    if (!api) return;
    if (api.selectedScrollSnap() !== selectedIndex) {
      api.scrollTo(selectedIndex, true);
    }
  }, [api, selectedIndex]);

  if (images.length === 0) return null;

  const hasMultiple = images.length > 1;

  return (
    <div className="w-full min-w-0">
      <Carousel
        setApi={setApi}
        opts={{ loop: hasMultiple, align: "center", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <div className="relative">
          <CarouselContent className="ml-0">
            {images.map((img, i) => (
              <CarouselItem key={`${img}-${i}`} className="basis-full pl-0">
                <div className="product-gallery-slide relative h-[min(88vw,460px)] w-full overflow-hidden rounded-2xl bg-white sm:h-[min(72vw,520px)] lg:aspect-square lg:h-auto lg:max-h-[600px]">
                  <Image
                    src={img}
                    alt={`${title} — image ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-contain object-center p-2 sm:p-3 lg:p-4"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {hasMultiple && (
            <>
              <span className="absolute right-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </span>
              <CarouselPrevious className="left-1.5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 border-border bg-white/95 shadow-sm backdrop-blur-sm sm:left-3 sm:h-10 sm:w-10" />
              <CarouselNext className="right-1.5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 border-border bg-white/95 shadow-sm backdrop-blur-sm sm:right-3 sm:h-10 sm:w-10" />
            </>
          )}
        </div>
      </Carousel>

      {hasMultiple && (
        <div className="scroll-snap-x mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4">
          {images.map((img, i) => (
            <button
              key={`thumb-${i}`}
              type="button"
              aria-label={`View image ${i + 1}`}
              aria-current={selectedIndex === i ? "true" : undefined}
              onClick={() => onSelect(i)}
              className={cn(
                "scroll-snap-item relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-white sm:h-16 sm:w-16 lg:h-20 lg:w-20",
                selectedIndex === i ? "border-primary" : "border-border",
              )}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
