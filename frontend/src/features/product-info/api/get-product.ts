import type { Product } from "@/shared";

import { handler } from "@/shared/api/http";

export const getProduct = async (id: string | string[]) => {
    return await handler<Product>(`/product/${id}`, {
        method: "GET",
    });
};
