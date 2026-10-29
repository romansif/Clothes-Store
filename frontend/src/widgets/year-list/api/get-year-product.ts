import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const getYearProducts = async (type: string, filter: string) => {
    return await handler<Product[]>(`/products/year/${type}/${filter}`, {
        method: "GET",
    });
};
