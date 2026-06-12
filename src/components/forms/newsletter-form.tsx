"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterFormData } from "@/schemas/contact-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Could not subscribe — try again.");
      return;
    }
    toast.success("You're on the list.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          aria-label="Email for newsletter"
          className="h-11 min-w-0 w-auto flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
        />
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="shrink-0 bg-white text-foreground hover:bg-white/90"
        >
          SUBSCRIBE
        </Button>
      </div>
      {errors.email && (
        <p className="sr-only" role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
