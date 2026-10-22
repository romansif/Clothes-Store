import { ref } from "vue";
import type {
    AddForm,
    AddFormErrorMessage, IsAgreeFormError,
    IsAgreeFormErrorMessage
} from "@/features/use-product";

export const addToCartForm = ref<AddForm>({
    colors: {
        hex: '',
        colorName: '',
    },
    sizes: '',
});

export const addToCartFormErrorMessages = ref<AddFormErrorMessage>({
    colors: '',
    sizes: '',
});

export const isAgreeFormErrorMessage = ref<IsAgreeFormErrorMessage>({
    agree: ''
});


export const isAgreeFormError = ref<IsAgreeFormError>({
    agree: false,
    agreeMessage: false,
})
