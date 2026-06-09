"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminConfirmDialog } from "@/components/admin/admin-confirm-dialog";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminList } from "@/hooks/use-admin-list";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
};

const PAGE_SIZE = 20;

export default function AdminNewsletterPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Subscriber | null>(null);
  const [exporting, setExporting] = useState(false);

  const { items, total, loading, error, reload } = useAdminList<Subscriber>({
    endpoint: "/api/admin/newsletter",
    listKey: "subscribers",
    page,
    pageSize: PAGE_SIZE,
    search,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  async function removeSubscriber(id: string) {
    setDeletingId(id);
    const res = await fetchWithSessionRefresh(`/api/admin/newsletter?id=${id}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not remove subscriber");
      return;
    }
    toast.success("Subscriber removed");
    setConfirmDelete(null);
    void reload();
  }

  function downloadCsv(rows: Subscriber[], filename: string) {
    const csv = [
      "email,subscribed_at",
      ...rows.map((s) => `${s.email},${s.createdAt}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportPage() {
    if (!items.length) {
      toast.error("No subscribers on this page to export");
      return;
    }
    downloadCsv(items, "newsletter-subscribers-page.csv");
    toast.success("Exported current page");
  }

  async function exportAll() {
    setExporting(true);
    const params = new URLSearchParams({ export: "all" });
    if (search.trim()) params.set("search", search.trim());
    const res = await fetchWithSessionRefresh(
      `/api/admin/newsletter?${params.toString()}`,
    );
    setExporting(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Export failed");
      return;
    }
    const data = (await res.json()) as { subscribers?: Subscriber[] };
    const rows = data.subscribers ?? [];
    if (!rows.length) {
      toast.error("No subscribers to export");
      return;
    }
    downloadCsv(rows, "newsletter-subscribers-all.csv");
    toast.success(`Exported ${rows.length} subscribers`);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Newsletter"
        description="Email subscribers from the storefront."
        onRefresh={() => void reload()}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPage}>
              <Download className="mr-2 h-4 w-4" />
              Export page
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={exporting}
              onClick={() => void exportAll()}
            >
              <Download className="mr-2 h-4 w-4" />
              {exporting ? "Exporting…" : "Export all"}
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Email address"
            onSearch={() => {
              setSearch(searchInput.trim());
              setPage(1);
            }}
          />
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
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subscribed</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <AdminTableSkeleton rows={5} cols={3} />
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No subscribers found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4 font-medium">{item.email}</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === item.id}
                          onClick={() => setConfirmDelete(item)}
                        >
                          <Trash2 className="mr-1 h-3.5 w-3.5" />
                          Remove
                        </Button>
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
        label="subscribers"
        loading={loading}
        onPageChange={setPage}
      />

      <AdminConfirmDialog
        open={Boolean(confirmDelete)}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title="Remove subscriber?"
        description={
          confirmDelete ? `Remove ${confirmDelete.email} from the newsletter list.` : ""
        }
        confirmLabel="Remove"
        destructive
        loading={deletingId === confirmDelete?.id}
        onConfirm={() => confirmDelete && void removeSubscriber(confirmDelete.id)}
      />
    </div>
  );
}
