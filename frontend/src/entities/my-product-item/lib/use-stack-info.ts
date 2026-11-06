import type { Product } from "@/shared";

export const useStackInfo = (product: Product) => {
  return product.variants.reduce((sum, item) => sum + item.count, 0);
};
