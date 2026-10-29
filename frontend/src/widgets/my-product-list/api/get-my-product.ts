import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const getMyProducts = async (userId: string) => {
    return await handler<Product[]>(`/my/products/${userId}`, {
        method: "GET",
    });
};
