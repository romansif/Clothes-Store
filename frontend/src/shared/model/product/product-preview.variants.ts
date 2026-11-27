import type { Product } from "@/shared/model";

export const productPreviewClass = (sizeImg: string, product: Product) => [
  sizeImg,
  product.variants.every((v) => v.count === 0) ? "opacity-40" : "",
];
