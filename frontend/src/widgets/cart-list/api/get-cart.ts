import type { CartItem } from "@/shared/model";
import { handler } from "@/shared/api";

export const getCartProducts = async (userId: string | null) => {
  return await handler<CartItem[]>(`/cart/${userId}`, {
    method: "GET",
  });
};
