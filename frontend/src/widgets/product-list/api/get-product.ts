import type { Product } from "@/shared";

import { handler } from "@/shared/api/http";

export const useGetProducts = () => {
    const getAllProducts = async () => {
        return await handler<Product[]>(`/products`, {
            method: "GET",
        });
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        return await handler<Product[]>(`/filtered/${type}/${filter}`, {
            method: "GET",
        });
    };

    return {
        getAllProducts,
        getFilteredProducts,
    };
};
