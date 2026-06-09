"use client";

import { Button } from "@/components/ui/button";

export function AdminPagination({
  page,
  totalPages,
  total,
  label,
  loading,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  label: string;
  loading?: boolean;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
      <span>
        Page {page} of {totalPages} · {total} {label}
      </span>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1 || loading}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages || loading}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
