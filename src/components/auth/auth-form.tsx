"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/constants/assets";
import { cn } from "@/lib/utils";

export function AuthShell({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-padding", className)}>
      <div className="container-site mx-auto max-w-md">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to store
        </Link>
        <h1 className="mt-6 text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {SITE_CONFIG.name} · Secure account access
        </p>
      </div>
    </div>
  );
}
