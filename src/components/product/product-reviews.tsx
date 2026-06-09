"use client";

import { useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Review, ReviewSortOption } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const REVIEWS_PER_PAGE = 10;

const sortOptions: { value: ReviewSortOption; label: string }[] = [
  { value: "most-recent", label: "Most Recent" },
  { value: "highest-rating", label: "Highest Rating" },
  { value: "lowest-rating", label: "Lowest Rating" },
  { value: "most-helpful", label: "Most Helpful" },
];

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

function sortReviews(reviews: Review[], sort: ReviewSortOption): Review[] {
  const sorted = [...reviews];
  switch (sort) {
    case "highest-rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "lowest-rating":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "most-helpful":
      return sorted.sort((a, b) => (b.helpful ?? 0) - (a.helpful ?? 0));
    default:
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  }
}

function getRatingBreakdown(reviews: Review[]) {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
  });
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: counts[star - 1],
    percent: Math.round((counts[star - 1] / total) * 100),
  }));
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            cls,
            i < rating ? "fill-amber-400 text-amber-400" : "text-border",
          )}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  const [sort, setSort] = useState<ReviewSortOption>("most-recent");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => sortReviews(reviews, sort), [reviews, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / REVIEWS_PER_PAGE));
  const paginated = sorted.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE,
  );
  const breakdown = getRatingBreakdown(reviews);

  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  };

  if (reviews.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-site">
        <h2 className="section-heading mb-8 text-center md:mb-10">Customer Reviews</h2>

        <div className="mb-8 grid gap-8 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
          {/* Rating summary */}
          <div className="rounded-xl border border-border bg-white p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold sm:text-4xl">
                {rating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={Math.round(rating)} size="md" />
                <p className="mt-1 text-sm text-muted-foreground">
                  {reviewCount} reviews
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {breakdown.map(({ star, count, percent }) => (
                <button
                  key={star}
                  type="button"
                  className="flex w-full items-center gap-2 text-sm"
                  aria-label={`${percent}% (${count}) reviews with ${star} star rating`}
                >
                  <span className="w-3 text-muted-foreground">{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-muted-foreground">
                    {percent}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Reviews list */}
          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing {(page - 1) * REVIEWS_PER_PAGE + 1}–
                {Math.min(page * REVIEWS_PER_PAGE, sorted.length)} of {sorted.length}
              </p>
              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort(v as ReviewSortOption);
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className="w-full sm:w-[180px]"
                  aria-label="Sort reviews"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ul className="space-y-4">
              {paginated.map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-border bg-white p-4 sm:p-5"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <StarRating rating={review.rating} />
                    <time className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed">{review.content}</p>
                  <p className="text-sm font-semibold">{review.author}</p>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-6 flex items-center justify-center gap-1"
                aria-label="Review pagination"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 text-xs"
                      onClick={() => goToPage(pageNum)}
                      aria-label={`Page ${pageNum}`}
                      aria-current={page === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                {totalPages > 5 && page < totalPages - 2 && (
                  <>
                    <span className="px-1 text-muted-foreground">…</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-xs"
                      onClick={() => goToPage(totalPages)}
                      aria-label={`Page ${totalPages}`}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
