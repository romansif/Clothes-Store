import { ref } from "vue";
import { productsStore } from "@/shared/composables/stores/products.store";

const { items } = productsStore();

const clipboard = ref<boolean>(false);

export const useOrderCard = () => {
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