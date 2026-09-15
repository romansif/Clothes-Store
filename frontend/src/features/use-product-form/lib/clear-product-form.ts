import { createProductForm, moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/model/product.error.ts";

export const clearProductForm = () => {
    createProductForm.value.title = '';

    // @ts-ignore
    createProductForm.value.collection = '';
    createProductForm.value.category = '';
    createProductForm.value.material = '';
    createProductForm.value.gender = '';
    createProductForm.value.sku = '';
    createProductForm.value.price = '';
    createProductForm.value.description = '';
    createProductForm.value.variants = [];
    moreCreateItemForm.sizes = [];
    moreCreateItemForm.colors = [];

    createProductFormErrorMessages.value.title = '';
    createProductFormErrorMessages.value.collections = '';
    createProductFormErrorMessages.value.category = '';
    createProductFormErrorMessages.value.material = '';
    createProductFormErrorMessages.value.gender = '';
    createProductFormErrorMessages.value.sku = '';
    createProductFormErrorMessages.value.price = '';
    createProductFormErrorMessages.value.description = '';
    createProductFormErrorMessages.value.variant = '';
    createProductFormErrorMessages.value.color = '';
    createProductFormErrorMessages.value.size = '';

    createProductFormErrors.value.title = false;
    createProductFormErrors.value.collections = false;
    createProductFormErrors.value.category = false;
    createProductFormErrors.value.material = false;
    createProductFormErrors.value.gender = false;
    createProductFormErrors.value.sku = false;
    createProductFormErrors.value.price = false;
    createProductFormErrors.value.description = false;
    createProductFormErrors.value.variant = false;
    createProductFormErrors.value.color = false;
    createProductFormErrors.value.size = false;
};