import type { Product } from "@/shared";

export const isInStock = (product: Product) => {
  if (!product?.id || !product.variants) return;

  return product.variants.reduce((sum, variant) => sum + (variant.count ?? 0), 0);
};

