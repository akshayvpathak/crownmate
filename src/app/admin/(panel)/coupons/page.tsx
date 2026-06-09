"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminConfirmDialog } from "@/components/admin/admin-confirm-dialog";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import {
  CouponFormDialog,
  type CouponFormValues,
} from "@/components/admin/coupon-form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

type Coupon = {
  id: string;
  code: string;
  discountPercent: number;
  active: boolean;
  createdAt?: string;
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Coupon | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetchWithSessionRefresh("/api/admin/coupons");
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Failed to load coupons");
      setCoupons([]);
      setLoading(false);
      return;
    }
    const data = (await res.json()) as { coupons?: Coupon[] };
    setCoupons(data.coupons ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(coupon: Coupon) {
    setEditing(coupon);
    setDialogOpen(true);
  }

  async function saveCoupon(values: CouponFormValues) {
    setSaving(true);
    const res = editing
      ? await fetchWithSessionRefresh(`/api/admin/coupons/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
      : await fetchWithSessionRefresh("/api/admin/coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
    setSaving(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not save coupon");
      return;
    }

    toast.success(editing ? "Coupon updated" : "Coupon created");
    setDialogOpen(false);
    setEditing(null);
    void load();
  }

  async function removeCoupon(id: string) {
    setDeletingId(id);
    const res = await fetchWithSessionRefresh(`/api/admin/coupons/${id}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not delete coupon");
      return;
    }
    toast.success("Coupon deleted");
    setConfirmDelete(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Coupons"
        description="Create and manage discount codes used at checkout."
        onRefresh={() => void load()}
        actions={
          <Button size="sm" onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add coupon
          </Button>
        }
      />

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
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <AdminTableSkeleton rows={4} cols={5} />
                ) : coupons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No coupons yet. Add your first code above.
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4 font-mono font-semibold">
                        {coupon.code}
                      </td>
                      <td className="px-4 py-4">{coupon.discountPercent}% off</td>
                      <td className="px-4 py-4">
                        <span
                          className={
                            coupon.active
                              ? "rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success"
                              : "rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
                          }
                        >
                          {coupon.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {coupon.createdAt
                          ? new Date(coupon.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(coupon)}
                          >
                            <Pencil className="mr-1 h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={deletingId === coupon.id}
                            onClick={() => setConfirmDelete(coupon)}
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Delete
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

      <CouponFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing ?? undefined}
        saving={saving}
        onSubmit={(values) => void saveCoupon(values)}
      />

      <AdminConfirmDialog
        open={Boolean(confirmDelete)}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title="Delete coupon?"
        description={
          confirmDelete
            ? `Remove "${confirmDelete.code}" — it will no longer work at checkout.`
            : ""
        }
        confirmLabel="Delete"
        destructive
        loading={deletingId === confirmDelete?.id}
        onConfirm={() => confirmDelete && void removeCoupon(confirmDelete.id)}
      />
    </div>
  );
}
