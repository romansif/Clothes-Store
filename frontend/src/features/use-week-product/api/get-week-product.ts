import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const productsWeek = ref<Product[]>([]);

export const useGetWeekProduct = () => {
    const getWeekProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/products/week/${type}/${filter}`, {
                method: 'GET',
            })
            productsWeek.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    return {
        getWeekProducts,
        productsWeek,
    }
}