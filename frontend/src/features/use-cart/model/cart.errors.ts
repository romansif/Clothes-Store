import {ref} from "vue";
import {type AddFormError, type IsAgreeFormError} from "@/features/use-cart/model/cart.types.form.ts";

export const cartFormErrors = ref<AddFormError>({
    color: false,
    size: false,
});

export const isAgreeFormError = ref<IsAgreeFormError>({
    agree: false,
    agreeMessage: false,
})
