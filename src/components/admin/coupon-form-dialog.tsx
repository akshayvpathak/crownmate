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

export type CouponFormValues = {
  code: string;
  discountPercent: number;
  usageLimit: number | null;
  active: boolean;
};

export function CouponFormDialog({
  open,
  onOpenChange,
  initial,
  saving,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: CouponFormValues;
  saving?: boolean;
  onSubmit: (values: CouponFormValues) => void;
}) {
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("5");
  const [usageLimit, setUsageLimit] = useState("");
  const [active, setActive] = useState("true");

  useEffect(() => {
    if (open) {
      setCode(initial?.code ?? "");
      setDiscountPercent(String(initial?.discountPercent ?? 5));
      setUsageLimit(initial?.usageLimit != null ? String(initial.usageLimit) : "");
      setActive(initial?.active === false ? "false" : "true");
    }
  }, [open, initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedLimit = usageLimit.trim();
    onSubmit({
      code,
      discountPercent: Number(discountPercent),
      usageLimit: trimmedLimit ? Number(trimmedLimit) : null,
      active: active === "true",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit coupon" : "Add coupon"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Code</label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SUMMER10"
              className="mt-1.5 font-mono"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Discount (%)</label>
            <Input
              type="number"
              min={1}
              max={100}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Usage limit</label>
            <Input
              type="number"
              min={1}
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              placeholder="Unlimited"
              className="mt-1.5"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Max number of times this code can be used. Leave empty for unlimited.
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={active} onValueChange={setActive}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : initial ? "Save changes" : "Create coupon"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
