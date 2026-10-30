import type { Product } from "@/shared";

import { handler } from "@/shared/api/http";

export const getWeekProducts = async (type: string, filter: string) => {
    return await handler<Product[]>(`/products/week/${type}/${filter}`, {
        method: "GET",
    });
};
