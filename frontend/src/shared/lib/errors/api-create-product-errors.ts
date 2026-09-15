import {ApiError} from "@/shared/api/http.ts";
import {createProductFormErrors} from "@/features/use-product-form/model/product.error.ts";
import {createProductFormErrorMessages, moreCreateItemForm} from "@/features/use-product-form/model/product.forms.ts";

export const createProductErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    createProductFormErrors.value.title = !!errors.title;
    createProductFormErrors.value.collections = !!errors.collection;
    createProductFormErrors.value.category = !!errors.category;
    createProductFormErrors.value.material = !!errors.material;
    createProductFormErrors.value.gender = !!errors.gender;
    createProductFormErrors.value.sku = !!errors.sku;
    createProductFormErrors.value.price = !!errors.price;
    createProductFormErrors.value.description = !!errors.description;
    createProductFormErrors.value.color = !!errors.colors;
    createProductFormErrors.value.size = !!errors.sizes;

    createProductFormErrorMessages.value.title = errors.title || '';
    createProductFormErrorMessages.value.collections = errors.collection || '';
    createProductFormErrorMessages.value.category = errors.category || '';
    createProductFormErrorMessages.value.material = errors.material || '';
    createProductFormErrorMessages.value.gender = errors.gender || '';
    createProductFormErrorMessages.value.sku = errors.sku || '';
    createProductFormErrorMessages.value.price = errors.price || '';
    createProductFormErrorMessages.value.description = errors.description || '';
    createProductFormErrorMessages.value.color = errors.colors || '';
    createProductFormErrorMessages.value.size = errors.sizes || '';

    if(moreCreateItemForm.sizes.length || moreCreateItemForm.colors.length || !moreCreateItemForm.variants.length) {
        createProductFormErrors.value.variant = !!errors.variant;

        createProductFormErrorMessages.value.variant = errors.variant || '';
    }
};