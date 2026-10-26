import { ref } from "vue";
import { handler } from "@/shared/api/http";
import { userData } from "@/shared/model/user.store";
import type { Product } from "@/shared";

export const myProducts = ref<Product[]>([]);

export const getMyProducts = async () => {
    if(!userData.value) return

    try{
        myProducts.value = await handler(`/my/products/${userData.value.id}`, {
            method: 'GET',
        });
    }catch(err){
        console.error(`Failed to get the all my products:`, err);
    }
};