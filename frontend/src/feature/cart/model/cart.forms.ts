import {ref} from "vue";
import type { AddForm, AddFormMessage } from "@/feature/cart/model/cart.types.ts";

export const addToCartForm = () => {
    const cartForm = ref<AddForm>({
        colors: {
            hex: '',
            colorName: '',
        },
        sizes: '',
    });

    const cartFormMessages = ref<AddFormMessage>({
        colorMessage: '',
        sizeMessage: '',
    });

    return {
        cartForm,
        cartFormMessages,
    }
}