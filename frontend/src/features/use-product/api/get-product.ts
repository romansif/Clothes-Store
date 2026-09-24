import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Product} from "@/shared/model/product.types.ts";

const product = ref<Product | null>(null);

export const useGetProduct = () => {
    const getProduct = async (id: string | string[]) => {
        return handler<Product>(`/product/${id}`, {
            method: 'GET',
        })
    };

    return {
        getProduct,
        product
    }
};