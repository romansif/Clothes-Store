import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const getYearProducts = async (type: string, filter: string) => {
  return await handler<Product[]>(`/products/year/${type}/${filter}`, {
    method: "GET",
  });
};
