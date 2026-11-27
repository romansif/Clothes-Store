import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const getSeasonal = async (filter: string) => {
  return await handler<Product[]>(`/products/collections/${filter}`, {
    method: "GET",
  });
};
