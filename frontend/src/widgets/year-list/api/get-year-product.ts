import type { Product } from "@/shared";

import { handler } from "@/shared/api/http";

export const getYearProducts = async (type: string, filter: string) => {
    return await handler<Product[]>(`/products/year/${type}/${filter}`, {
        method: "GET",
    });
};
