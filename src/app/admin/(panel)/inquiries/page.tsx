"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import {
  InquiryDetailDialog,
  type InquiryDetail,
} from "@/components/admin/inquiry-detail-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminList } from "@/hooks/use-admin-list";

type Inquiry = InquiryDetail;

const PAGE_SIZE = 15;

export default function AdminInquiriesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { items, total, loading, error, reload } = useAdminList<Inquiry>({
    endpoint: "/api/admin/inquiries",
    listKey: "inquiries",
    page,
    pageSize: PAGE_SIZE,
    search,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function openDetail(inquiry: Inquiry) {
    setSelected(inquiry);
    setDetailOpen(true);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact inquiries"
        description="Messages submitted through the contact form."
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
            placeholder="Name, email, subject, or message"
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
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer border-b border-border align-top last:border-0 hover:bg-muted/20"
                      onClick={() => openDetail(item)}
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.email}</p>
                        {item.phone && (
                          <p className="text-xs text-muted-foreground">{item.phone}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">{item.subject || "—"}</td>
                      <td className="max-w-md px-4 py-4">
                        <p className="line-clamp-3 whitespace-pre-wrap">
                          {item.message}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetail(item);
                          }}
                        >
                          <Eye className="mr-1 h-3.5 w-3.5" />
                          View
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
        label="inquiries"
        loading={loading}
        onPageChange={setPage}
      />

      <InquiryDetailDialog
        inquiry={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
