"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  size = "md",
  className,
}: QuantityStepperProps) {
  const controlSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-lg border border-border bg-background",
        className,
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        className={cn(
          controlSize,
          "flex items-center justify-center text-foreground transition-colors hover:bg-secondary active:bg-secondary/80",
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span
        className={cn(
          "flex min-w-8 items-center justify-center border-x border-border px-1 text-sm font-medium tabular-nums",
          controlSize,
          size === "sm" && "text-xs",
        )}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className={cn(
          controlSize,
          "flex items-center justify-center text-foreground transition-colors hover:bg-secondary active:bg-secondary/80",
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
