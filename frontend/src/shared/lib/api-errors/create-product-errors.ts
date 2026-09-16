import {ApiError} from "@/shared/api/http.ts";
import {applyErrors} from "@/shared/lib/error-helper/errors-helper.ts";
import {createProductFormErrors, moreCreateItemFormErrors} from "@/features/use-product-form/model/product.error.ts";
import {
    createProductFormErrorMessages, moreCreateItemForm,
    moreCreateItemFormErrorMessages
} from "@/features/use-product-form/model/product.forms.ts";
import {createProductSchema, moreCreateItemsSchema} from "@/features/use-product-form/model/product.schemas.ts";

export const createProductApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        createProductSchema,
        errors,
        createProductFormErrors.value,
        createProductFormErrorMessages.value
    )

    if(moreCreateItemForm.sizes.length || moreCreateItemForm.colors.length || !moreCreateItemForm.variants.length) {
        applyErrors(
            moreCreateItemsSchema,
            errors,
            moreCreateItemFormErrors.value,
            moreCreateItemFormErrorMessages.value
        )
    }
};