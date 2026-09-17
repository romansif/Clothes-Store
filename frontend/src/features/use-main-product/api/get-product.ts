import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);

export const useGetProducts = () => {
    const getAllProducts = async () => {
        try{
            const res = await handler(`/products`, {
                method: 'GET',
            })
            products.value = res;
            allProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/filtered/${type}/${filter}`, {
                method: 'GET',
            })
            products.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    return {
        allProducts,
        products,

        getAllProducts,
        getFilteredProducts
    }
};