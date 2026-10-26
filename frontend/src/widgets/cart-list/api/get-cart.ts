import { handler } from "@/shared/api/http";
import type { CartItem } from "@/entities/cart-item";

export const getCartProducts = async (userId: string | null) => {
     return await handler<CartItem[]>(`/cart/${userId}`, {
        method: 'GET',
    });
};


