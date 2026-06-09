"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  ProductEditDialog,
  type ProductFormValues,
} from "@/components/admin/product-edit-dialog";
import {
  VariantEditDialog,
  type VariantFormValues,
} from "@/components/admin/variant-edit-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

type ProductVariant = {
  id: string;
  title: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
};

type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  vendor: string;
  image: string | null;
  images: string[];
  variantCount: number;
  variants: ProductVariant[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [editingVariant, setEditingVariant] = useState<{
    product: CatalogProduct;
    variant: ProductVariant;
  } | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingVariant, setSavingVariant] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetchWithSessionRefresh("/api/admin/products");
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Failed to load products");
      setProducts([]);
      setLoading(false);
      return;
    }
    const data = (await res.json()) as { products?: CatalogProduct[] };
    setProducts(data.products ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((product) => {
      if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
      if (stockFilter === "in_stock" && !product.variants.some((v) => v.available))
        return false;
      if (stockFilter === "out_of_stock" && product.variants.some((v) => v.available))
        return false;
      if (!q) return true;
      return (
        product.title.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.vendor.toLowerCase().includes(q) ||
        product.variants.some(
          (v) => v.sku.toLowerCase().includes(q) || v.title.toLowerCase().includes(q),
        )
      );
    });
  }, [products, search, categoryFilter, stockFilter]);

  function openProductEdit(product: CatalogProduct) {
    setEditingProduct(product);
    setProductDialogOpen(true);
  }

  function openVariantEdit(product: CatalogProduct, variant: ProductVariant) {
    setEditingVariant({ product, variant });
    setVariantDialogOpen(true);
  }

  async function saveProduct(values: ProductFormValues) {
    if (!editingProduct) return;
    setSavingProduct(true);
    const res = await fetchWithSessionRefresh(
      `/api/admin/products/${editingProduct.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    setSavingProduct(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not save product");
      return;
    }

    toast.success("Product updated");
    setProductDialogOpen(false);
    setEditingProduct(null);
    void load();
  }

  async function saveVariant(values: VariantFormValues) {
    if (!editingVariant) return;
    setSavingVariant(true);
    const res = await fetchWithSessionRefresh(
      `/api/admin/products/${editingVariant.product.id}/variants/${editingVariant.variant.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    setSavingVariant(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not save variant");
      return;
    }

    toast.success("Variant updated");
    setVariantDialogOpen(false);
    setEditingVariant(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        description="Edit catalog prices, availability, and product details."
        onRefresh={() => void load()}
      />

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-3">
          <Input
            placeholder="Search title, slug, SKU, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stock</SelectItem>
              <SelectItem value="in_stock">In stock</SelectItem>
              <SelectItem value="out_of_stock">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-border bg-muted/40"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {products.length === 0
                ? "No products in catalog."
                : "No products match your filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                  {product.image && (
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-sm text-muted-foreground">
                          {product.category} · {product.vendor}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openProductEdit(product)}
                        >
                          <Pencil className="mr-1 h-3.5 w-3.5" />
                          Edit product
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/products/${product.slug}`} target="_blank">
                            View on store
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                          <tr>
                            <th className="pb-2 pr-4">Variant</th>
                            <th className="pb-2 pr-4">SKU</th>
                            <th className="pb-2 pr-4">Price</th>
                            <th className="pb-2 pr-4">Stock</th>
                            <th className="pb-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.variants.map((variant) => (
                            <tr key={variant.id} className="border-t border-border">
                              <td className="py-2 pr-4">{variant.title}</td>
                              <td className="py-2 pr-4 font-mono text-xs">
                                {variant.sku}
                              </td>
                              <td className="py-2 pr-4">
                                {formatPrice(variant.price)}
                                {variant.compareAtPrice && (
                                  <span className="ml-2 text-xs text-muted-foreground line-through">
                                    {formatPrice(variant.compareAtPrice)}
                                  </span>
                                )}
                              </td>
                              <td className="py-2 pr-4">
                                <span
                                  className={
                                    variant.available
                                      ? "text-success"
                                      : "text-destructive"
                                  }
                                >
                                  {variant.available ? "In stock" : "Out of stock"}
                                </span>
                              </td>
                              <td className="py-2 text-right">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openVariantEdit(product, variant)}
                                >
                                  <Pencil className="mr-1 h-3.5 w-3.5" />
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editingProduct && (
        <ProductEditDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          initial={{
            title: editingProduct.title,
            description: editingProduct.description,
            category: editingProduct.category ?? "",
            vendor: editingProduct.vendor,
            images: editingProduct.images?.length
              ? editingProduct.images
              : editingProduct.image
                ? [editingProduct.image]
                : [],
          }}
          saving={savingProduct}
          onSubmit={(values) => void saveProduct(values)}
        />
      )}

      {editingVariant && (
        <VariantEditDialog
          open={variantDialogOpen}
          onOpenChange={setVariantDialogOpen}
          productTitle={editingVariant.product.title}
          initial={{
            title: editingVariant.variant.title,
            sku: editingVariant.variant.sku,
            price: editingVariant.variant.price,
            compareAtPrice: editingVariant.variant.compareAtPrice,
            available: editingVariant.variant.available,
          }}
          saving={savingVariant}
          onSubmit={(values) => void saveVariant(values)}
        />
      )}
    </div>
  );
}
