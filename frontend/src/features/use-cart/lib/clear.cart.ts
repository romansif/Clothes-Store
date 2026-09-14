import { cartForm, cartFormErrorMessages } from "@/features/use-cart/model/cart.form.ts";
import { cartFormErrors } from "@/features/use-cart/model/cart.errors.ts";

export const clearAddToCartForm = () => {
    const clearCartForm = () => {
        cartForm.value.colors = {
            hex: '',
            colorName: ''
        };
        cartForm.value.sizes = '';

        cartFormErrorMessages.value.color = '';
        cartFormErrorMessages.value.size = '';

        cartFormErrors.value.color = false;
        cartFormErrors.value.size = false;
    };

    return {
        clearCartForm,
    }
}