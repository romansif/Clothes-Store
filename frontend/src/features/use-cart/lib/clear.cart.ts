import { cartForm, cartFormErrorMessages } from "@/features/use-cart/model/cart.form.ts";
import { cartFormErrors } from "@/features/use-cart/lib/cart.errors.ts";

export const clearAddToCartForm = () => {
    const clearCartForm = () => {
        cartForm.value.colors = {
            hex: '',
            colorName: ''
        };
        cartForm.value.sizes = '';

        cartFormErrorMessages.value.colorMessage = '';
        cartFormErrorMessages.value.sizeMessage = '';

        cartFormErrors.value.colorError = false;
        cartFormErrors.value.sizeError = false;
    };

    return {
        clearCartForm,
    }
}