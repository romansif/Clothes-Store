import { addToCartForm, addToCartFormErrorMessages } from "@/features/use-product/model/add.to.cart.form.ts";
import { addToCartFormErrors } from "@/features/use-product/model/add.to.cart.errors.ts";

export const clearAddToCartForm = () => {
    const clearCartForm = () => {
        addToCartForm.value.colors = {
            hex: '',
            colorName: ''
        };
        addToCartForm.value.sizes = '';

        addToCartFormErrorMessages.value.colors = '';
        addToCartFormErrorMessages.value.sizes = '';

        addToCartFormErrors.value.colors = false;
        addToCartFormErrors.value.sizes = false;
    };

    return {
        clearCartForm,
    }
}