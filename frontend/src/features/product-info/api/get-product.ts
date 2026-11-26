import type { Product } from "@/shared/model";

import { handler } from "@/shared/api";

export const getProduct = async (id: string | string[]) => {
  return await handler<Product>(`/product/${id}`, {
    method: "GET",
  });
};
