import { handler } from "@/shared/api/http.ts";
import type {Product} from "@/shared/model/product.types.ts";

export const getProduct = async (id: string | string[]) => {
    return handler<Product>(`/product/${id}`, {
        method: 'GET',
    })
};
