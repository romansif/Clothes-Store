import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type { Product } from "@/shared/model/product.types.ts";

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);

export const useGetProducts = () => {
    const getAllProducts = async () => {
        try{
            allProducts.value = await handler(`/products`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        try{
            products.value = await handler(`/filtered/${type}/${filter}`, {
                method: 'GET',
            });
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