"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export type AnalyticsDay = {
  date: string;
  orders: number;
  revenuePaise: number;
};

export type AnalyticsData = {
  days: number;
  series: AnalyticsDay[];
  totals: { orders: number; revenuePaise: number };
};

function formatShortDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function BarChart({
  data,
  valueKey,
  formatValue,
  colorClass,
}: {
  data: AnalyticsDay[];
  valueKey: "orders" | "revenuePaise";
  formatValue: (value: number) => string;
  colorClass: string;
}) {
  const max = useMemo(
    () => Math.max(1, ...data.map((d) => d[valueKey])),
    [data, valueKey],
  );

  return (
    <div className="flex h-44 items-end gap-1 sm:gap-1.5">
      {data.map((day) => {
        const value = day[valueKey];
        const height = Math.max(value > 0 ? 8 : 2, Math.round((value / max) * 100));
        return (
          <div
            key={day.date}
            className="group flex min-w-0 flex-1 flex-col items-center justify-end"
            title={`${formatShortDate(day.date)}: ${formatValue(value)}`}
          >
            <div
              className={`w-full rounded-t-md transition-opacity group-hover:opacity-80 ${colorClass}`}
              style={{ height: `${height}%` }}
            />
            <span className="mt-2 hidden text-[10px] text-muted-foreground sm:block">
              {formatShortDate(day.date)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function AdminAnalyticsCharts({ analytics }: { analytics: AnalyticsData }) {
  const [range, setRange] = useState<7 | 14>(analytics.days === 7 ? 7 : 14);

  const visibleSeries = useMemo(() => {
    if (range >= analytics.series.length) return analytics.series;
    return analytics.series.slice(-range);
  }, [analytics.series, range]);

  const visibleTotals = useMemo(
    () => ({
      orders: visibleSeries.reduce((sum, day) => sum + day.orders, 0),
      revenuePaise: visibleSeries.reduce((sum, day) => sum + day.revenuePaise, 0),
    }),
    [visibleSeries],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Orders and confirmed revenue over the selected period.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={range === 7 ? "default" : "outline"}
            onClick={() => setRange(7)}
          >
            7 days
          </Button>
          <Button
            type="button"
            size="sm"
            variant={range === 14 ? "default" : "outline"}
            onClick={() => setRange(14)}
          >
            14 days
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Orders</CardTitle>
            <p className="text-sm text-muted-foreground">
              {visibleTotals.orders} orders in last {range} days
            </p>
          </CardHeader>
          <CardContent>
            <BarChart
              data={visibleSeries}
              valueKey="orders"
              formatValue={(v) => String(v)}
              colorClass="bg-primary"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue</CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatPrice(visibleTotals.revenuePaise / 100)} confirmed in last {range}{" "}
              days
            </p>
          </CardHeader>
          <CardContent>
            <BarChart
              data={visibleSeries}
              valueKey="revenuePaise"
              formatValue={(v) => formatPrice(v / 100)}
              colorClass="bg-foreground/80"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
