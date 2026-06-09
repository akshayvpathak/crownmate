"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminList } from "@/hooks/use-admin-list";

type WarrantyRegistration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  productName: string;
  orderId: string;
  purchaseDate: string;
  createdAt: string;
};

const PAGE_SIZE = 15;

export default function AdminWarrantyPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { items, total, loading, error, reload } = useAdminList<WarrantyRegistration>({
    endpoint: "/api/admin/warranty",
    listKey: "registrations",
    page,
    pageSize: PAGE_SIZE,
    search,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Warranty registrations"
        description="Product warranty claims submitted by customers."
        onRefresh={() => void reload()}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Name, email, product, or order ID"
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
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Purchase date</th>
                  <th className="px-4 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <AdminTableSkeleton rows={5} cols={5} />
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border align-top last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.email}</p>
                        <p className="text-xs text-muted-foreground">{item.phone}</p>
                      </td>
                      <td className="px-4 py-4">{item.productName}</td>
                      <td className="px-4 py-4 font-mono text-xs">{item.orderId}</td>
                      <td className="px-4 py-4">{item.purchaseDate}</td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString("en-IN")}
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
        label="registrations"
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
}
