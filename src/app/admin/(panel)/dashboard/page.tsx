"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AdminAnalyticsCharts,
  type AnalyticsData,
} from "@/components/admin/admin-analytics-charts";
import {
  AdminDashboardStats,
  type DashboardStats,
} from "@/components/admin/admin-dashboard-stats";
import {
  InquiryDetailDialog,
  type InquiryDetail,
} from "@/components/admin/inquiry-detail-dialog";
import { OrderDetailDialog } from "@/components/admin/order-detail-dialog";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminBasePath } from "@/hooks/use-admin-base-path";
import { formatPrice } from "@/lib/utils";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";
import type { OrderDetails } from "@/types";
import { toast } from "sonner";

type RecentOrder = {
  id: string;
  orderNumber: string;
  status: string;
  amountPaise: number;
  customerEmail: string;
  createdAt: string;
};

type RecentInquiry = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  phone: string | null;
  createdAt: string;
};

type RecentWarranty = {
  id: string;
  name: string;
  email: string;
  productName: string;
  orderId: string;
  createdAt: string;
};

type DashboardData = {
  stats: DashboardStats;
  analytics: AnalyticsData;
  recent: {
    orders: RecentOrder[];
    inquiries: RecentInquiry[];
    warranty: RecentWarranty[];
  };
};

export default function AdminDashboardPage() {
  const adminBasePath = useAdminBasePath();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [detailOrder, setDetailOrder] = useState<OrderDetails | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetchWithSessionRefresh("/api/admin/dashboard");
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      setError(body.error || "Failed to load dashboard");
      setData(null);
      setLoading(false);
      return;
    }
    setData((await res.json()) as DashboardData);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function openOrderDetail(id: string) {
    setDetailLoading(true);
    setDetailOpen(true);
    const res = await fetchWithSessionRefresh(`/api/admin/orders/${id}`);
    if (!res.ok) {
      toast.error("Could not load order details");
      setDetailOpen(false);
      setDetailLoading(false);
      return;
    }
    const body = (await res.json()) as { order?: OrderDetails };
    setDetailOrder(body.order ?? null);
    setDetailLoading(false);
  }

  function openInquiryDetail(inquiry: RecentInquiry) {
    setInquiryDetail(inquiry);
    setInquiryOpen(true);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of orders, customers, and store activity."
        onRefresh={() => void load()}
      />

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && !data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-border bg-muted/40"
            />
          ))}
        </div>
      ) : data ? (
        <>
          <AdminDashboardStats stats={data.stats} basePath={adminBasePath} />

          <AdminAnalyticsCharts analytics={data.analytics} />

          <div className="grid gap-6 xl:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent orders</CardTitle>
                <Link
                  href={`${adminBasePath}/orders`}
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recent.orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No orders yet.</p>
                ) : (
                  data.recent.orders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => void openOrderDetail(order.id)}
                      className="w-full rounded-lg border border-border p-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-muted/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono text-xs font-semibold">
                          {order.orderNumber}
                        </p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.customerEmail}
                      </p>
                      <p className="mt-1 font-medium">
                        {formatPrice(order.amountPaise / 100)}
                      </p>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent inquiries</CardTitle>
                <Link
                  href={`${adminBasePath}/inquiries`}
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recent.inquiries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No inquiries yet.</p>
                ) : (
                  data.recent.inquiries.map((inquiry) => (
                    <button
                      key={inquiry.id}
                      type="button"
                      onClick={() => openInquiryDetail(inquiry)}
                      className="w-full rounded-lg border border-border p-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-muted/30"
                    >
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                      <p className="mt-1 line-clamp-2 text-xs">
                        {inquiry.subject || inquiry.message}
                      </p>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent warranty</CardTitle>
                <Link
                  href={`${adminBasePath}/warranty`}
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recent.warranty.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No registrations yet.</p>
                ) : (
                  data.recent.warranty.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-border p-3 text-sm"
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.productName}
                      </p>
                      <p className="mt-1 font-mono text-xs">Order: {item.orderId}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}

      <OrderDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={detailOrder}
        loading={detailLoading}
      />

      <InquiryDetailDialog
        inquiry={inquiryDetail}
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
      />
    </div>
  );
}
