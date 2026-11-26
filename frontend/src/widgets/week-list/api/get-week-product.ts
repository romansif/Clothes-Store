import type { Product } from "@/shared/model";

import { handler } from "@/shared/api";

export const getWeekProducts = async (type: string, filter: string) => {
  return await handler<Product[]>(`/products/week/${type}/${filter}`, {
    method: "GET",
  });
};
