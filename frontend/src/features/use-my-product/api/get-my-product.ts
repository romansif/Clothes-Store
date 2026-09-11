import {ref} from "vue";
import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const { userData } = userStore();

const myProducts = ref<Product[]>([]);

export const useGetMyProduct = () => {
    const getMyProducts = async () => {
        try{
            const res = await handler(`/my/products/${userData.id}`, {
                method: 'GET',
            })
            myProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    return {
        getMyProducts,
        myProducts,
    }
}