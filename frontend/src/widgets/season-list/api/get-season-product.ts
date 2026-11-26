import type { Product } from "@/shared/model";

import { handler } from "@/shared/api";

export const getSeasonal = async (filter: string) => {
  return await handler<Product[]>(`/products/collections/${filter}`, {
    method: "GET",
  });
};
