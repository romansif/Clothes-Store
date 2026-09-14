import {ref} from "vue";
import type { AddForm, AddFormErrorMessage, IsAgreeFormErrorMessage} from "@/features/use-cart/model/cart.types.form.ts";

export const cartForm = ref<AddForm>({
    colors: {
        hex: '',
        colorName: '',
    },
    sizes: '',
});

export const cartFormErrorMessages = ref<AddFormErrorMessage>({
    color: '',
    size: '',
});


export const isAgreeFormErrorMessage = ref<IsAgreeFormErrorMessage>({
    agree: ''
})
