import Link from "next/link";
import { cn } from "@/lib/utils";

export function LegalPage({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-padding bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_45%)]",
        className,
      )}
    >
      <div className="container-site mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to store
        </Link>

        <header className="mt-5 border-b border-border/80 pb-6">
          <h1 className="text-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </header>

        <article
          className={cn(
            "prose prose-sm mt-8 max-w-none md:prose-base",
            "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
            "prose-p:text-foreground/90 prose-li:text-foreground/90",
            "prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_li]:marker:text-primary/70",
          )}
        >
          {children}
        </article>
      </div>
    </div>
  );
}
