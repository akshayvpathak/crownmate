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

  const onSubmit = async (_data: NewsletterFormData) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Subscribed successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row">
      <Input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        aria-label="Email for newsletter"
        className="h-11 flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
      />
      <Button
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className="shrink-0 bg-white text-foreground hover:bg-white/90"
      >
        SUBSCRIBE
      </Button>
      {errors.email && (
        <p className="sr-only" role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
