import {ref} from "vue";
import { type AddFormError } from "@/feature/cart/model/cart.types.ts";

const cartFormErrors = ref<AddFormError>({
    colorError: false,
    sizeError: false,
});

export const addToCartErrors = () => {
    return {
        cartFormErrors,
    }
}