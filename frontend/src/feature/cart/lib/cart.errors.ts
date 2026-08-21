import {ref} from "vue";
import type { AddFormError } from "@/feature/cart/model/cart.types.ts";

export const addToCartErrors = () => {
    const cartFormErrors = ref<AddFormError>({
        colorError: false,
        sizeError: false,
    });

    return {
        cartFormErrors,
    }
}