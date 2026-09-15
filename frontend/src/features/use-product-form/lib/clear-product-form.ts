import { createProductForm, moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/model/product.error.ts";

export const clearProductForm = () => {
    createProductForm.value.title = '';

    // @ts-ignore
    createProductForm.value.collections = '';
    createProductForm.value.category = '';
    createProductForm.value.material = '';
    createProductForm.value.gender = '';
    createProductForm.value.sku = '';
    createProductForm.value.price = 0;
    createProductForm.value.description = '';

    moreCreateItemForm.sizes = [];
    moreCreateItemForm.colors = [];
    moreCreateItemForm.variants = []

    createProductFormErrorMessages.value.title = '';
    createProductFormErrorMessages.value.collections = '';
    createProductFormErrorMessages.value.category = '';
    createProductFormErrorMessages.value.material = '';
    createProductFormErrorMessages.value.gender = '';
    createProductFormErrorMessages.value.sku = '';
    createProductFormErrorMessages.value.price = '';
    createProductFormErrorMessages.value.description = '';
    createProductFormErrorMessages.value.variants = '';
    createProductFormErrorMessages.value.colors = '';
    createProductFormErrorMessages.value.sizes = '';

    createProductFormErrors.value.title = false;
    createProductFormErrors.value.collections = false;
    createProductFormErrors.value.category = false;
    createProductFormErrors.value.material = false;
    createProductFormErrors.value.gender = false;
    createProductFormErrors.value.sku = false;
    createProductFormErrors.value.price = false;
    createProductFormErrors.value.description = false;
    createProductFormErrors.value.variants = false;
    createProductFormErrors.value.colors = false;
    createProductFormErrors.value.sizes = false;
};