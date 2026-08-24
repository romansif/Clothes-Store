import { ref } from "vue";
import { orderStore } from "@/feature/orders/model/order.store.ts";

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


    return {
        items,
        clipboard,

        copyText,
    }
}