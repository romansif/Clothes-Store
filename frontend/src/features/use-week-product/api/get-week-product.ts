import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const productsWeek = ref<Product[]>([]);

export const useGetWeekProduct = () => {
    const getWeekProducts = async (type: string, filter: string) => {
        try{
            productsWeek.value = await handler(`/products/week/${type}/${filter}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    return {
        getWeekProducts,
        productsWeek,
    }
}