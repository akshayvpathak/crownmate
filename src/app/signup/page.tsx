"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        return;
      }
      router.push(
        `/verify-email?email=${encodeURIComponent(email.trim().toLowerCase())}`,
      );
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      variant="signup"
      step={{ current: 1, total: 2, label: "Your details" }}
      title="Create account"
      subtitle="We'll email you a one-time code to verify your address."
    >
      <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
        <div>
          <label htmlFor="signup-name" className="text-sm font-medium">
            Full name
          </label>
          <Input
            id="signup-name"
            className="mt-1.5"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="signup-email"
            className="mt-1.5"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="signup-password"
            className="mt-1.5"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Create a password"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            At least 8 characters, with letters and numbers.
          </p>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="mt-1 w-full"
          disabled={loading}
        >
          {loading ? "Sending code…" : "Continue"}
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms-and-conditions"
            className="font-medium text-primary hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
