import { productForms } from "@/feature/product/model/product.forms.ts";
import { productsFormErrors } from "@/feature/product/lib/product.error.ts";

const { createProductFormErrors } = productsFormErrors();
const { createProductForm, moreCreateItem, createProductFormMessages } = productForms();

export const clearProductsForms = () => {
    const clearProductForm = () => {
        createProductForm.value.title = '';
        createProductForm.value.category = '';
        createProductForm.value.material = '';
        createProductForm.value.description = '';
        createProductForm.value.price = '';
        createProductForm.value.quantity = '';
        createProductForm.value.collection = '';
        moreCreateItem.sizes = [];
        moreCreateItem.colors = [];

        createProductFormMessages.value.titleMessage = '';
        createProductFormMessages.value.colorMessage = '';
        createProductFormMessages.value.materialMessage = '';
        createProductFormMessages.value.descriptionMessage = '';
        createProductFormMessages.value.priceMessage = '';
        createProductFormMessages.value.colorMessage = '';
        createProductFormMessages.value.sizeMessage = '';
        createProductFormMessages.value.quantityMessage = '';
        createProductFormMessages.value.collectionsMessage = '';

        createProductFormErrors.value.titleError = false;
        createProductFormErrors.value.categoryError = false;
        createProductFormErrors.value.materialError = false;
        createProductFormErrors.value.descriptionError = false;
        createProductFormErrors.value.priceError = false;
        createProductFormErrors.value.colorError = false;
        createProductFormErrors.value.sizeError = false;
        createProductFormErrors.value.quantityError = false;
        createProductFormErrors.value.collectionsError = false;
    };

    return{
        clearProductForm,
    }
}