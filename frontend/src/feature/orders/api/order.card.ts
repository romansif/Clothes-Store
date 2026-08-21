import { ref } from "vue";
import { productStore } from "@/feature/products/model/product.store.ts";

const { items } = productStore();

const clipboard = ref<boolean>(false);

export const orderCard = () => {
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