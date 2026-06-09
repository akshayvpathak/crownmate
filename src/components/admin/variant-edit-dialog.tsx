"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type VariantFormValues = {
  title: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
};

export function VariantEditDialog({
  open,
  onOpenChange,
  productTitle,
  initial,
  saving,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  initial: VariantFormValues;
  saving?: boolean;
  onSubmit: (values: VariantFormValues) => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [sku, setSku] = useState(initial.sku);
  const [price, setPrice] = useState(String(initial.price));
  const [compareAtPrice, setCompareAtPrice] = useState(
    initial.compareAtPrice != null ? String(initial.compareAtPrice) : "",
  );
  const [available, setAvailable] = useState(initial.available ? "true" : "false");

  useEffect(() => {
    if (open) {
      setTitle(initial.title);
      setSku(initial.sku);
      setPrice(String(initial.price));
      setCompareAtPrice(
        initial.compareAtPrice != null ? String(initial.compareAtPrice) : "",
      );
      setAvailable(initial.available ? "true" : "false");
    }
  }, [open, initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      sku,
      price: Number(price),
      compareAtPrice: compareAtPrice.trim() ? Number(compareAtPrice) : null,
      available: available === "true",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit variant</DialogTitle>
          <p className="text-sm text-muted-foreground">{productTitle}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Variant name</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">SKU</label>
            <Input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1.5 font-mono"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Price (₹)</label>
              <Input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Compare at (₹)</label>
              <Input
                type="number"
                min={0}
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="Optional"
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Availability</label>
            <Select value={available} onValueChange={setAvailable}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">In stock</SelectItem>
                <SelectItem value="false">Out of stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save variant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
