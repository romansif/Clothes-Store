import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const getProduct = async (id: string | string[]) => {
    return await handler<Product>(`/product/${id}`, {
        method: 'GET',
    })
};
