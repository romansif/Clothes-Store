import { createProductForm, moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/model/product.error.ts";

export const clearProductForm = () => {
    createProductForm.value.title = '';
    createProductForm.value.category = '';
    createProductForm.value.material = '';
    createProductForm.value.description = '';
    createProductForm.value.sku = '';
    createProductForm.value.price = '';
    createProductForm.value.variants = [];
    createProductForm.value.collection = {
        condition: '',
        season: '',
        name: ''
    };
    moreCreateItemForm.sizes = [];
    moreCreateItemForm.colors = [];

    createProductFormErrorMessages.value.title = '';
    createProductFormErrorMessages.value.color = '';
    createProductFormErrorMessages.value.material = '';
    createProductFormErrorMessages.value.description = '';
    createProductFormErrorMessages.value.price = '';
    createProductFormErrorMessages.value.color = '';
    createProductFormErrorMessages.value.size = '';
    createProductFormErrorMessages.value.variant = '';
    createProductFormErrorMessages.value.collections = '';

    createProductFormErrors.value.title = false;
    createProductFormErrors.value.category = false;
    createProductFormErrors.value.material = false;
    createProductFormErrors.value.description = false;
    createProductFormErrors.value.price = false;
    createProductFormErrors.value.color = false;
    createProductFormErrors.value.size = false;
    createProductFormErrors.value.variant = false;
    createProductFormErrors.value.collections = false;
};