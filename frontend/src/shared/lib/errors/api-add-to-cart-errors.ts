import {ApiError} from "@/shared/api/http.ts";
import {addToCartFormErrors} from "@/features/use-product/model/add.to.cart.errors.ts";
import {addToCartFormErrorMessages} from "@/features/use-product/model/add.to.cart.form.ts";

export const addToCartErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    const hasColorError = Object.keys(errors).some(
        key =>
            key.startsWith('colors[') ||
            key === 'colors'
    );

    const colorError = Object.entries(errors).find(
        ([key]) =>
            key.startsWith('colors[') ||
            key === 'colors'
    );

    addToCartFormErrors.value.color = hasColorError;
    addToCartFormErrors.value.size = !!errors.sizes;

    addToCartFormErrorMessages.value.color = colorError?.[1] || '';
    addToCartFormErrorMessages.value.size = errors.sizes || '';
};