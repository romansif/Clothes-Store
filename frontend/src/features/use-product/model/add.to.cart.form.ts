import {ref} from "vue";
import type { AddForm, AddFormErrorMessage, IsAgreeFormErrorMessage} from "@/features/use-product/model/add.to.cart.types.form.ts";

export const addToCartForm = ref<AddForm>({
    colors: {
        hex: '',
        colorName: '',
    },
    sizes: '',
});

export const addToCartFormErrorMessages = ref<AddFormErrorMessage>({
    color: '',
    size: '',
});


export const isAgreeFormErrorMessage = ref<IsAgreeFormErrorMessage>({
    agree: ''
})
