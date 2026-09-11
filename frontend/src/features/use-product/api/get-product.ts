import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const product = ref<Product>({} as Product);

export const useGetProduct = () => {
    const getProduct = async (id: string | string[]) => {
        try{
            const data = await handler(`/products/${id}`, {
                method: 'GET',
            });
            product.value = data
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }

    }

    return {
        getProduct,
        product
    }
};