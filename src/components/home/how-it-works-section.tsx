import Image from "next/image";
import Link from "next/link";
import { howItWorksSteps } from "@/data/home-content";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-frizty">
        <div className="mb-8 text-center md:mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="section-heading mt-2">Three devices, one weekly routine</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Pick what fits your goal. Add the others later if you want — they stack
            nicely but each works on its own.
          </p>
        </div>

        <div className="space-y-10 md:space-y-14">
          {howItWorksSteps.map((step, index) => (
            <div
              key={step.id}
              className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={step.image}
                  alt={step.product}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {step.eyebrow}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{step.id}</p>
                <h3 className="mt-2 text-lg font-bold">{step.product}</h3>
                <h4 className="mt-3 text-base font-semibold">{step.title}</h4>
                <ul className="mt-4 space-y-4">
                  {step.features.map((feature) => (
                    <li key={feature.title}>
                      <p className="font-medium">{feature.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-6">
                  <Link href={`/products/${step.productSlug}`}>View Product</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
