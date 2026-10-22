import { ref } from "vue";
import { handler } from "@/shared/api/http";
import type { Product } from "@/shared";

export const product = ref<Product | null>(null);

export const getProduct = async (id: string | string[]) => {
    return product.value = await handler<Product>(`/product/${id}`, {
        method: 'GET',
    })
};
