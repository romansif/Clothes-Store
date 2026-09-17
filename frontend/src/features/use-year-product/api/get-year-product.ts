import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const productsYear = ref<Product[]>([]);

export const useGetYearProduct = () => {
    const getYearProducts = async (type: string, filter: string) => {
        try{
            productsYear.value = await handler(`/products/year/${type}/${filter}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    return {
        getYearProducts,
        productsYear,
    }
}