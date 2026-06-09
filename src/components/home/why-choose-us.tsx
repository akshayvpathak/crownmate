import { whyChooseUsFeatures } from "@/data/home-content";
import { Award, ShieldCheck, Cpu, BadgeCheck } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  quality: <Award className="h-6 w-6" />,
  safe: <ShieldCheck className="h-6 w-6" />,
  smart: <Cpu className="h-6 w-6" />,
  warranty: <BadgeCheck className="h-6 w-6" />,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#834fd9] text-white">
      <div className="container-frizty">
        <h2 className="section-heading mb-8 text-center text-white md:mb-12">
          Why Choose Frizty Only?
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {whyChooseUsFeatures.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 md:h-16 md:w-16">
                {feature.icon ? icons[feature.icon] : null}
              </div>
              <p className="text-xs font-bold sm:text-sm md:text-base">
                {feature.title}
              </p>
              {feature.subtitle && (
                <p className="mt-0.5 text-xs text-white/80 md:text-sm">
                  {feature.subtitle}
                </p>
              )}
              {feature.description && (
                <p className="mt-1 text-xs italic text-white/70">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
