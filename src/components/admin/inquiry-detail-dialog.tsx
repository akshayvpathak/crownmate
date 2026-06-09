"use client";

import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type InquiryDetail = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
};

export function InquiryDetailDialog({
  inquiry,
  open,
  onOpenChange,
}: {
  inquiry: InquiryDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{inquiry ? inquiry.name : "Inquiry"}</DialogTitle>
        </DialogHeader>
        {inquiry ? (
          <div className="space-y-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${inquiry.email}`}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                {inquiry.email}
              </a>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => void copyText(inquiry.email, "Email")}
              >
                <Copy className="mr-1 h-3.5 w-3.5" />
                Copy email
              </Button>
            </div>
            {inquiry.phone && (
              <div className="flex flex-wrap items-center gap-2">
                <span>{inquiry.phone}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void copyText(inquiry.phone!, "Phone")}
                >
                  <Copy className="mr-1 h-3.5 w-3.5" />
                  Copy phone
                </Button>
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Subject
              </p>
              <p className="mt-1">{inquiry.subject || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Message
              </p>
              <p className="mt-1 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-3">
                {inquiry.message}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Received {new Date(inquiry.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        ) : (
          <p className="py-6 text-center text-muted-foreground">Inquiry not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
