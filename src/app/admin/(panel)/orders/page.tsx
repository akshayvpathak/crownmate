"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import { OrderDetailDialog } from "@/components/admin/order-detail-dialog";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUSES } from "@/constants/order-status";
import { getAllowedNextStatuses } from "@/constants/order-status-transitions";
import { getPaymentMethodLabel, getStatusLabel } from "@/lib/order-status";
import { formatPrice } from "@/lib/utils";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";
import type { OrderDetails } from "@/types";

type AdminOrder = {
  id: string;
  orderNumber: string;
  status: string;
  amountPaise: number;
  subtotalPaise: number;
  discountPaise: number;
  shippingPaise: number;
  currency: string;
  paymentMethod: string;
  couponCode?: string | null;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  itemCount: number;
};

type AdminStatsData = {
  total: number;
  pendingPayment: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenuePaise: number;
};

const PAGE_SIZE = 15;

function AdminOrdersPageContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") ?? "all";
  const initialEmail = searchParams.get("email") ?? "";

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<Record<string, string>>({});

  const [statusFilter, setStatusFilter] = useState(
    ORDER_STATUSES.includes(initialStatus as (typeof ORDER_STATUSES)[number])
      ? initialStatus
      : "all",
  );
  const [emailFilter, setEmailFilter] = useState(initialEmail);
  const [orderFilter, setOrderFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    status:
      initialStatus !== "all" &&
      ORDER_STATUSES.includes(initialStatus as (typeof ORDER_STATUSES)[number])
        ? initialStatus
        : "",
    email: initialEmail.trim(),
    orderNumber: "",
  });

  const [detailOrder, setDetailOrder] = useState<OrderDetails | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const buildQuery = useCallback(
    (p: number) => {
      const params = new URLSearchParams({
        page: String(p),
        limit: String(PAGE_SIZE),
      });
      if (appliedFilters.status) params.set("status", appliedFilters.status);
      if (appliedFilters.email) params.set("email", appliedFilters.email);
      if (appliedFilters.orderNumber)
        params.set("orderNumber", appliedFilters.orderNumber);
      return params.toString();
    },
    [appliedFilters],
  );

  const loadStats = useCallback(async () => {
    const res = await fetchWithSessionRefresh("/api/admin/stats");
    if (!res.ok) return;
    setStats((await res.json()) as AdminStatsData);
  }, []);

  const loadOrders = useCallback(
    async (p: number) => {
      setLoading(true);
      setError(null);
      const res = await fetchWithSessionRefresh(`/api/admin/orders?${buildQuery(p)}`);
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error || "Failed to load orders");
        setOrders([]);
        setLoading(false);
        return;
      }
      const data = (await res.json()) as {
        orders?: AdminOrder[];
        total?: number;
      };
      setOrders(data.orders ?? []);
      setTotal(data.total ?? 0);
      const next: Record<string, string> = {};
      (data.orders ?? []).forEach((o) => {
        next[o.id] = o.status;
      });
      setDraftStatus(next);
      setLoading(false);
    },
    [buildQuery],
  );

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  useEffect(() => {
    void loadOrders(page);
  }, [page, loadOrders, appliedFilters]);

  function applyFilters() {
    const nextFilters = {
      status: statusFilter === "all" ? "" : statusFilter,
      email: emailFilter.trim(),
      orderNumber: orderFilter.trim(),
    };
    setAppliedFilters(nextFilters);
    setPage(1);
  }

  async function saveStatus(id: string) {
    const status = draftStatus[id];
    if (!status) return;
    setSavingId(id);
    const res = await fetchWithSessionRefresh(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSavingId(null);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Update failed");
      return;
    }
    toast.success("Order status updated");
    await Promise.all([loadOrders(page), loadStats()]);
  }

  async function openDetail(id: string) {
    setDetailLoading(true);
    setDetailOpen(true);
    const res = await fetchWithSessionRefresh(`/api/admin/orders/${id}`);
    if (!res.ok) {
      toast.error("Could not load order details");
      setDetailOpen(false);
      setDetailLoading(false);
      return;
    }
    const data = (await res.json()) as { order?: OrderDetails };
    setDetailOrder(data.order ?? null);
    setDetailLoading(false);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Orders"
        description="Manage order status, review payments, and track fulfillment."
        onRefresh={() => {
          void loadStats();
          void loadOrders(page);
        }}
      />

      {stats && <AdminStats stats={stats} />}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-3 md:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <Input
              placeholder="Order number"
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
            />
            <Input
              placeholder="Customer email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {ORDER_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {getStatusLabel(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <AdminTableSkeleton rows={6} cols={6} />
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No orders match your filters.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4 align-top">
                        <p className="font-mono text-xs font-semibold">
                          {o.orderNumber}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(o.createdAt).toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {o.itemCount} item{o.itemCount === 1 ? "" : "s"}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="font-medium">{o.customerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {o.customerEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {o.customerPhone}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {o.shippingCity}, {o.shippingState} {o.shippingPincode}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p>{getPaymentMethodLabel(o.paymentMethod)}</p>
                        {o.couponCode && (
                          <p className="mt-1 text-xs text-success">
                            Coupon: {o.couponCode}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="font-semibold">
                          {formatPrice(o.amountPaise / 100)}
                        </p>
                        {o.discountPaise > 0 && (
                          <p className="text-xs text-success">
                            -{formatPrice(o.discountPaise / 100)} discount
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Ship:{" "}
                          {o.shippingPaise === 0
                            ? "Free"
                            : formatPrice(o.shippingPaise / 100)}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="space-y-2">
                          <OrderStatusBadge status={o.status} />
                          <Select
                            value={draftStatus[o.id] ?? o.status}
                            onValueChange={(value) =>
                              setDraftStatus((s) => ({ ...s, [o.id]: value }))
                            }
                          >
                            <SelectTrigger className="h-9 min-h-0 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {getAllowedNextStatuses(o.status).map((s) => (
                                <SelectItem key={s} value={s}>
                                  {getStatusLabel(s)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => openDetail(o.id)}
                          >
                            <Eye className="mr-1 h-3.5 w-3.5" />
                            View
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={
                              savingId === o.id || draftStatus[o.id] === o.status
                            }
                            onClick={() => saveStatus(o.id)}
                          >
                            {savingId === o.id ? "Saving…" : "Update"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        label="orders"
        loading={loading}
        onPageChange={setPage}
      />

      <OrderDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={detailOrder}
        loading={detailLoading}
      />
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted-foreground">Loading orders…</p>}
    >
      <AdminOrdersPageContent />
    </Suspense>
  );
}
