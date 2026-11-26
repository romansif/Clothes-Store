import type { Product } from "@/shared/model";

import { handler } from "@/shared/api";

export const getYearProducts = async (type: string, filter: string) => {
  return await handler<Product[]>(`/products/year/${type}/${filter}`, {
    method: "GET",
  });
};
