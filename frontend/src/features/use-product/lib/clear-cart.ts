import { addToCartForm, addToCartFormErrorMessages } from "@/shared/model/add.to.cart.form.ts";

export const clearCartForm = () => {
    addToCartForm.value.colors = {
        hex: '',
        colorName: ''
    };
    addToCartForm.value.sizes = '';

    addToCartFormErrorMessages.value.colors = '';
    addToCartFormErrorMessages.value.sizes = '';
};