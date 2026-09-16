import {ApiError} from "@/shared/api/http.ts";
import {applyErrors} from "@/shared/lib/error-helper/errors-helper.ts";
import {addToCartFormErrors} from "@/features/use-product/model/add.to.cart.errors.ts";
import {addToCartFormErrorMessages} from "@/features/use-product/model/add.to.cart.form.ts";
import {addToCartSchema} from "@/features/use-product/model/add.to.cart.schemas.ts";

export const addToCartApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        addToCartSchema,
        errors,
        addToCartFormErrors.value,
        addToCartFormErrorMessages.value
    )
};