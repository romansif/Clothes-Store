import { handler } from "@/shared/api";
import type { CartItem } from "@/shared/model";

export const getCartProducts = async (userId: string | null) => {
  return await handler<CartItem[]>(`/cart/${userId}`, {
    method: "GET",
  });
};
