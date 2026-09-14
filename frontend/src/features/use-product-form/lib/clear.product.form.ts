import { createProductForm, moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/lib/product.error.ts";

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

    createProductFormErrorMessages.value.titleMessage = '';
    createProductFormErrorMessages.value.colorMessage = '';
    createProductFormErrorMessages.value.materialMessage = '';
    createProductFormErrorMessages.value.descriptionMessage = '';
    createProductFormErrorMessages.value.priceMessage = '';
    createProductFormErrorMessages.value.colorMessage = '';
    createProductFormErrorMessages.value.sizeMessage = '';
    createProductFormErrorMessages.value.variantMessage = '';
    createProductFormErrorMessages.value.collectionsMessage = '';

    createProductFormErrors.value.titleError = false;
    createProductFormErrors.value.categoryError = false;
    createProductFormErrors.value.materialError = false;
    createProductFormErrors.value.descriptionError = false;
    createProductFormErrors.value.priceError = false;
    createProductFormErrors.value.colorError = false;
    createProductFormErrors.value.sizeError = false;
    createProductFormErrors.value.variantError = false;
    createProductFormErrors.value.collectionsError = false;
};