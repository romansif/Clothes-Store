import { addToCartForm } from "@/feature/cart/model/cart.form.ts";
import { addToCartErrors } from "@/feature/cart/lib/cart.errors.ts";

const { cartFormErrors } = addToCartErrors();
const { cartForm, cartFormMessages } = addToCartForm();

export const clearAddToCartForm = () => {
    const clearCartForm = () => {
        cartForm.value.colors = {
            hex: '',
            colorName: ''
        };
        cartForm.value.sizes = '';

        cartFormMessages.value.colorMessage = '';
        cartFormMessages.value.sizeMessage = '';

        cartFormErrors.value.colorError = false;
        cartFormErrors.value.sizeError = false;
    };

    return {
        clearCartForm,
    }
}