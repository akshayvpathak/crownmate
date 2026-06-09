"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type ProductFormValues = {
  title: string;
  description: string;
  category: string;
  vendor: string;
  images: string[];
};

export function ProductEditDialog({
  open,
  onOpenChange,
  initial,
  saving,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: ProductFormValues;
  saving?: boolean;
  onSubmit: (values: ProductFormValues) => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory] = useState(initial.category);
  const [vendor, setVendor] = useState(initial.vendor);
  const [images, setImages] = useState<string[]>(initial.images);

  useEffect(() => {
    if (open) {
      setTitle(initial.title);
      setDescription(initial.description);
      setCategory(initial.category);
      setVendor(initial.vendor);
      setImages(initial.images.length ? initial.images : [""]);
    }
  }, [open, initial]);

  function updateImage(index: number, value: string) {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  }

  function addImage() {
    setImages((prev) => [...prev, ""]);
  }

  function removeImage(index: number) {
    setImages((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= images.length) return;
    setImages((prev) => {
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      vendor,
      images: images.map((url) => url.trim()).filter(Boolean),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Short description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 min-h-24"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Vendor</label>
              <Input
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Images</label>
              <Button type="button" size="sm" variant="outline" onClick={addImage}>
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add image
              </Button>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Paths like /images/... or full URLs. First image is the main product
              photo.
            </p>
            <div className="space-y-3">
              {images.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    {url.trim() ? (
                      <Image
                        src={url.trim()}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>
                  <Input
                    value={url}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="/images/product/hero.png"
                    className="min-w-0 flex-1"
                  />
                  <div className="flex shrink-0 gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-10 w-10"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-10 w-10"
                      disabled={index === images.length - 1}
                      onClick={() => moveImage(index, 1)}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10"
                      disabled={images.length <= 1}
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
