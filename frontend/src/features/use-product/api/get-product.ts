import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Product} from "@/shared/model/product.types.ts";

const product = ref<Product | null>(null);

export const useGetProduct = () => {
    const getProduct = async (id: string | string[]) => {
        try{
            product.value = await handler(`/products/${id}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }
    };

    return {
        getProduct,
        product
    }
};