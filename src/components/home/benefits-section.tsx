import { Shield, Lock, Truck, BadgeCheck } from "lucide-react";
import type { Feature } from "@/types";

const icons: Record<string, React.ReactNode> = {
  shield: <Shield className="h-7 w-7" />,
  lock: <Lock className="h-7 w-7" />,
  truck: <Truck className="h-7 w-7" />,
  badge: <BadgeCheck className="h-7 w-7" />,
};

export function BenefitsSection({ features }: { features: Feature[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-primary">
          Crownmate&apos;s Promise
        </p>
        <h2 className="section-heading mb-8 text-center md:mb-12">
          What you get when you order
        </h2>
        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="flex flex-col items-center rounded-xl border border-border bg-white p-5 text-center md:p-6"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground">
                {feature.icon ? icons[feature.icon] : null}
              </div>
              <h3 className="mb-2 text-sm font-semibold md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
