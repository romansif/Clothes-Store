import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const getWeekProducts = async (type: string, filter: string) => {
    return await handler<Product[]>(`/products/week/${type}/${filter}`, {
        method: 'GET',
    });
};
