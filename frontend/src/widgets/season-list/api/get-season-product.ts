import type { Product } from "@/shared";

import { handler } from "@/shared/api/http";

export const getSeasonal = async (filter: string) => {
    return await handler<Product[]>(`/products/collections/${filter}`, {
        method: "GET",
    });
};
