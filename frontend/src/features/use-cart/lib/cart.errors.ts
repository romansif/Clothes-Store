import {ref} from "vue";
import {type AddFormError, type IsAgreeFormError} from "@/features/use-cart/model/cart.types.form.ts";

export const cartFormErrors = ref<AddFormError>({
    colorError: false,
    sizeError: false,
});

export const isAgreeFormError = ref<IsAgreeFormError>({
    agreeError: false,
    agreeMessageError: false,
})
