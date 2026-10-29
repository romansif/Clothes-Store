import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const getSeasonal = async (filter: string) => {
    return await handler<Product[]>(`/products/collections/${filter}`, {
        method: "GET",
    });
};
