"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Package, ShieldCheck, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/constants/assets";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

type AuthVariant = "login" | "signup" | "verify";

const AUTH_PANEL_COPY: Record<
  AuthVariant,
  { description: string; image: string; imageAlt: string }
> = {
  login: {
    description: "Sign in to manage orders, track shipments, and checkout faster.",
    image: images.hero.helmet,
    imageAlt: "Crownmate red light helmet",
  },
  signup: {
    description:
      "Join thousands using Crownmate at home. Create an account to track orders and save your details for faster checkout.",
    image: images.hero.brandStory,
    imageAlt: "Person using a Crownmate device",
  },
  verify: {
    description:
      "One quick step left. Verify your email so we can keep your account secure and send order updates.",
    image: images.hero.helmet,
    imageAlt: "Crownmate red light helmet",
  },
};

const AUTH_HIGHLIGHTS = [
  {
    icon: Package,
    title: "Track every order",
    description: "Real-time updates from checkout to delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & private",
    description: "Your data is encrypted and never shared.",
  },
  {
    icon: Sparkles,
    title: "Member perks",
    description: "Faster checkout and saved preferences.",
  },
] as const;

export function AuthShell({
  title,
  subtitle,
  children,
  className,
  variant = "login",
  step,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  variant?: AuthVariant;
  step?: { current: number; total: number; label: string };
}) {
  const panel = AUTH_PANEL_COPY[variant];

  return (
    <div
      className={cn(
        "relative -mx-[clamp(0.9375rem,4vw,2.5rem)] flex min-h-[calc(100dvh-7.5rem)] flex-col lg:min-h-[calc(100dvh-9rem)] lg:flex-row",
        className,
      )}
    >
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:w-[46%] xl:w-[48%]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15),transparent_50%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-black/10 blur-3xl"
        />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 text-white xl:p-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={images.brand.logo}
                alt={SITE_CONFIG.name}
                width={140}
                height={36}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/85">
              {SITE_CONFIG.tagline}. {panel.description}
            </p>
          </div>

          <ul className="mt-10 space-y-5">
            {AUTH_HIGHLIGHTS.map(
              ({ icon: Icon, title: highlightTitle, description }) => (
                <li key={highlightTitle} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold">{highlightTitle}</p>
                    <p className="mt-0.5 text-sm text-white/75">{description}</p>
                  </div>
                </li>
              ),
            )}
          </ul>

          <div className="relative mt-10 flex justify-center">
            <div
              className={cn(
                "relative w-full max-w-md",
                variant === "signup" ? "aspect-[5/4]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={panel.image}
                alt={panel.imageAlt}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(min-width: 1024px) 40vw, 0px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-center bg-[linear-gradient(180deg,#faf8ff_0%,#f5f5f5_100%)] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
        {/* Mobile brand strip */}
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-white lg:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-0.5 text-sm text-white/90">{SITE_CONFIG.tagline}</p>
          </div>
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
            <Image
              src={panel.image}
              alt="Crownmate hair growth device"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            ← Back to store
          </Link>

          <div className="mt-5 rounded-2xl border border-border/80 bg-background p-6 shadow-[0_8px_30px_rgba(131,79,217,0.08)] sm:p-8">
            {step && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Step {step.current} of {step.total} · {step.label}
              </p>
            )}
            <h1 className="text-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
            <div className="mt-6 sm:mt-7">{children}</div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            {variant === "verify" ? (
              <Mail className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            )}
            {SITE_CONFIG.name} · Secure account access
          </p>
        </div>
      </div>
    </div>
  );
}
