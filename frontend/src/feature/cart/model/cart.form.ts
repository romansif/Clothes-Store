import {ref} from "vue";
import { type AddForm, type AddFormMessage } from "@/entities/cart/cart.types.form.ts";

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

export const addToCartForm = () => {
    return {
        cartForm,
        cartFormMessages,
    }
}