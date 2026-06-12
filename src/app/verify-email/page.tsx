"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(
    searchParams.get("email")?.trim().toLowerCase() ?? "",
  );
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Verification failed");
        return;
      }
      toast.success("Email verified. You can log in.");
      router.push("/login");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setResendLoading(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) toast.error(data.error || "Could not resend");
      else toast.success("Code sent");
    } catch {
      toast.error("Network error");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <AuthShell
      variant="verify"
      step={{ current: 2, total: 2, label: "Verify email" }}
      title="Verify email"
      subtitle="Enter the 6-digit code we sent to your inbox."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            className="mt-1.5"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Code</label>
          <Input
            className="mt-1.5 tracking-[0.3em]"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
        </div>
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? "Checking…" : "Verify"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={resendLoading || !email}
          onClick={resend}
        >
          {resendLoading ? "Sending…" : "Resend code"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading…</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
