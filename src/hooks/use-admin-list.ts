"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

export function useAdminList<T>({
  endpoint,
  listKey,
  page,
  pageSize,
  search,
  extraParams,
}: {
  endpoint: string;
  listKey: string;
  page: number;
  pageSize: number;
  search?: string;
  extraParams?: Record<string, string>;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = JSON.stringify(extraParams ?? {});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    });
    if (search?.trim()) params.set("search", search.trim());
    const parsedFilters = JSON.parse(filtersKey) as Record<string, string>;
    Object.entries(parsedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const res = await fetchWithSessionRefresh(`${endpoint}?${params.toString()}`);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Failed to load data");
      setItems([]);
      setLoading(false);
      return;
    }

    const data = (await res.json()) as Record<string, unknown>;
    setItems((data[listKey] as T[]) ?? []);
    setTotal((data.total as number) ?? 0);
    setLoading(false);
  }, [endpoint, filtersKey, listKey, page, pageSize, search]);

  useEffect(() => {
    void load();
  }, [load]);

  return { items, total, loading, error, reload: load };
}
