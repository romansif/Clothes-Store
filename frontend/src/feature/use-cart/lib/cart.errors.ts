import {ref} from "vue";
import { type AddFormError } from "@/entities/cart/model/cart.types.form.ts";

const cartFormErrors = ref<AddFormError>({
    colorError: false,
    sizeError: false,
});

export const addToCartErrors = () => {
    return {
        cartFormErrors,
    }
}