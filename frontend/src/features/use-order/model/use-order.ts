import { ref } from "vue";
import { orderStore } from "@/entities/order/model/order.store.ts";
import type {Product} from "@/entities/product/model/product.types.ts";

const { items } = orderStore();

const clipboard = ref<boolean>(false);

export const useOrder = () => {
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
    };

    const orderQuantity = (product: Product) => {
        const quantityList = product.quantity || [];

        const totalCount = quantityList.find(p => p.size === product.sizes);

        return totalCount?.count ?? 0;
    };

    return {
        items,
        clipboard,

        copyText,
        orderQuantity
    }
}