import {ref} from "vue";
import {type AddFormError, type IsAgreeFormError} from "@/features/use-cart/model/cart.types.form.ts";

const cartFormErrors = ref<AddFormError>({
    colorError: false,
    sizeError: false,
});

const isAgreeFormError = ref<IsAgreeFormError>({
    agreeError: false,
    agreeMessageError: false,
})

export const addToCartErrors = () => {
    return {
        cartFormErrors,
        isAgreeFormError
    }
}