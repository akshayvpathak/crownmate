"use client";

import { useEffect, useState } from "react";

/** Active coupon codes from admin-managed MongoDB (checkout validation uses the same source). */
export function useActiveCoupons() {
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/coupons");
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { codes?: string[] };
        if (!cancelled) setCodes(data.codes ?? []);
      } catch {
        if (!cancelled) setCodes([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return codes;
}
