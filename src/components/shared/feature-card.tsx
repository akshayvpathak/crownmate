import {
  Shield,
  Lock,
  Truck,
  BadgeCheck,
  Sparkles,
  Heart,
  Brain,
  Droplets,
} from "lucide-react";
import type { Feature } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-8 w-8" />,
  lock: <Lock className="h-8 w-8" />,
  truck: <Truck className="h-8 w-8" />,
  badge: <BadgeCheck className="h-8 w-8" />,
  quality: <Sparkles className="h-8 w-8" />,
  safe: <Heart className="h-8 w-8" />,
  smart: <Brain className="h-8 w-8" />,
  warranty: <BadgeCheck className="h-8 w-8" />,
  droplet: <Droplets className="h-8 w-8" />,
};

interface FeatureCardProps {
  feature: Feature;
  variant?: "default" | "compact" | "hero";
  className?: string;
}

export function FeatureCard({
  feature,
  variant = "default",
  className,
}: FeatureCardProps) {
  const icon = feature.icon ? iconMap[feature.icon] : null;

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-col items-center text-center", className)}>
        {icon && (
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground">
            {icon}
          </div>
        )}
        <p className="text-sm font-bold">{feature.title}</p>
        {feature.subtitle && <p className="text-xs font-medium">{feature.subtitle}</p>}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground">
            {icon}
          </div>
        )}
        <span className="text-xs font-bold text-foreground">{feature.title}</span>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl bg-secondary p-6 text-center md:p-8",
        className,
      )}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold">{feature.title}</h3>
      {feature.subtitle && (
        <p className="text-sm font-medium text-muted-foreground">{feature.subtitle}</p>
      )}
      {feature.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      )}
    </article>
  );
}
