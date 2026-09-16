import {
    createProductForm, moreCreateItemForm,
    createProductFormErrors, moreCreateItemFormErrors,
    createProductFormErrorMessages, moreCreateItemFormErrorMessages
} from "@/features/use-product-form/model/product.forms.ts";

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
    moreCreateItemForm.variants = [];

    createProductFormErrorMessages.value.title = '';
    createProductFormErrorMessages.value.collections = '';
    createProductFormErrorMessages.value.category = '';
    createProductFormErrorMessages.value.material = '';
    createProductFormErrorMessages.value.gender = '';
    createProductFormErrorMessages.value.sku = '';
    createProductFormErrorMessages.value.price = '';
    createProductFormErrorMessages.value.description = '';

    moreCreateItemFormErrorMessages.value.colors = '';
    moreCreateItemFormErrorMessages.value.sizes = '';
    moreCreateItemFormErrorMessages.value.variants = '';

    createProductFormErrors.value.title = false;
    createProductFormErrors.value.collections = false;
    createProductFormErrors.value.category = false;
    createProductFormErrors.value.material = false;
    createProductFormErrors.value.gender = false;
    createProductFormErrors.value.sku = false;
    createProductFormErrors.value.price = false;
    createProductFormErrors.value.description = false;

    moreCreateItemFormErrors.value.colors = false;
    moreCreateItemFormErrors.value.sizes = false;
    moreCreateItemFormErrors.value.variants = false;
};