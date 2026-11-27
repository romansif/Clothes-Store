import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const getWeekProducts = async (type: string, filter: string) => {
  return await handler<Product[]>(`/products/week/${type}/${filter}`, {
    method: "GET",
  });
};
