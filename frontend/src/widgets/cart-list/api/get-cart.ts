import type { CartItem } from "@/entities/cart-item";
import { handler } from "@/shared/api/http";

export const getCartProducts = async (userId: string | null) => {
    return await handler<CartItem[]>(`/cart/${userId}`, {
        method: "GET",
    });
};
