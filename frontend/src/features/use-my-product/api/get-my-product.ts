import {ref} from "vue";
import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import type { Product } from "@/shared/model/product.types.ts";

const { userData } = userStore();

const myProducts = ref<Product[]>([]);

export const useGetMyProduct = () => {
    const getMyProducts = async () => {
        if(!userData.value) return

        try{
            myProducts.value = await handler(`/my/products/${userData.value.id}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    return {
        getMyProducts,
        myProducts,
    }
}