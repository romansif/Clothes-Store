import {ref} from "vue";
import {type AddFormError, type IsAgreeFormError} from "@/features/use-product/model/add.to.cart.types.form.ts";

export const addToCartFormErrors = ref<AddFormError>({
    colors: false,
    sizes: false,
});

export const isAgreeFormError = ref<IsAgreeFormError>({
    agree: false,
    agreeMessage: false,
})
