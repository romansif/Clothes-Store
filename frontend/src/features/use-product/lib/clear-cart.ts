import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product/model/add.to.cart.form.ts";

export const clearCartForm = () => {
    addToCartForm.value.colors = {
        hex: '',
        colorName: ''
    };
    addToCartForm.value.sizes = '';

    addToCartFormErrorMessages.value.colors = '';
    addToCartFormErrorMessages.value.sizes = '';
};