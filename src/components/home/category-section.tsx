"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryCards } from "@/data/home-content";
export function CategorySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <h2 className="section-heading mb-1 text-center">Pick a device</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground md:mb-10">
          Shop by Category
        </p>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <div className="scroll-snap-x -mx-3 flex gap-2.5 overflow-x-auto px-3 pb-2 sm:-mx-4 sm:gap-3 sm:px-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className="scroll-snap-item flex w-[108px] shrink-0 flex-col items-center gap-1.5 sm:w-[130px] sm:gap-2 md:w-[140px]"
              >
                <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full bg-secondary sm:h-[110px] sm:w-[110px] md:h-[120px] md:w-[120px]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="120px"
                    className="object-contain p-1"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-semibold leading-tight sm:text-sm">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    {cat.itemCount} product{cat.itemCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden grid-cols-3 gap-6 md:grid">
          {categoryCards.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-full bg-secondary">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="160px"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold">{cat.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {cat.itemCount} product{cat.itemCount !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
