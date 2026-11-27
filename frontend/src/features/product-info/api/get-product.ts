import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const getProduct = async (id: string | string[]) => {
  return await handler<Product>(`/product/${id}`, {
    method: "GET",
  });
};
