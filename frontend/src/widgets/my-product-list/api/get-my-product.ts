import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const getMyProducts = async (userId: string) => {
  return await handler<Product[]>(`/my/products/${userId}`, {
    method: "GET",
  });
};
