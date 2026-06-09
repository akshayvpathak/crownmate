import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { formatPrice } from "@/lib/utils";

const featured = [
  {
    slug: "laser-hair-growth-helmet",
    title: "Crownmate RedLight Helmet™",
    price: 2999,
    image: images.products.redlightHelmet,
  },
  {
    slug: "electric-scalp-massager",
    title: "Crownmate Pulse Pro Massager™",
    price: 799,
    image: images.products.scalpMassager,
  },
];

export function FeaturedShowcase() {
  return (
    <section className="bg-white py-6 md:py-8">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:gap-3 md:gap-6">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-border p-2.5 transition-shadow hover:shadow-md sm:gap-3 sm:p-3 md:gap-5 md:p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-20 sm:w-20 md:h-28 md:w-28">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-xs font-medium leading-snug md:text-sm">
                  {item.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-semibold md:text-base">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
