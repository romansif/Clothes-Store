const BASE_URL = 'http://localhost:3000';

import { computed, ref } from "vue";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

const { orders } = productsStore();

const clipboard = ref<boolean>(false);

export const useOrderCard = () => {
    const items = computed(() => {
        if(Array.isArray(orders.value)) {
            return orders.value.flatMap(order => order.orderItems || []);
        }
    })

    const productPreview = computed(() => {
        return(id: string) => {
            if(!id){
                console.log('Id не найден');
                return;
            }

            const product = items.value?.find(p => p.id === id);
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${BASE_URL}/${product.images[0]}`;
            }
        }
    });


    const copyText = async (text: string) => {
        try{
            clipboard.value = true;

            setTimeout(() => {
                clipboard.value = false;
            }, 1500);

            await navigator.clipboard.writeText(text)
        }catch(err){
            console.error('Error while copying: ', err)
        }
    }

    return {
        items,
        productPreview,
        clipboard,
        copyText,
    }
}