import type { CartItem } from "@/entities/cart-item";
import { handler } from "@/shared/api";

export const getCartProducts = async (userId: string | null) => {
  return await handler<CartItem[]>(`/cart/${userId}`, {
    method: "GET",
  });
};
