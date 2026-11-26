import type { Product } from "@/shared/model";

import { handler } from "@/shared/api/http";

export const getMyProducts = async (userId: string) => {
  return await handler<Product[]>(`/my/products/${userId}`, {
    method: "GET",
  });
};
