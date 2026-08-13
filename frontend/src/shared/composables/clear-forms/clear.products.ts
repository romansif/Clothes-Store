import { productsForms } from "@/shared/composables/forms/products.forms";
import { productsFormErrors } from "@/shared/composables/errors/errors-messages/products.errors";

const { createProductFormErrors, addCartFormErrors } = productsFormErrors();
const { createProductForm, addToCartForm, addToCartFormMessages, moreCreateItem, createProductFormMessages, searchProductForm } = productsForms();

export const clearProductsForms = () => {
    const clearProductForm = () => {
        createProductForm.value.title = '';
        createProductForm.value.category = '';
        createProductForm.value.material = '';
        createProductForm.value.description = '';
        createProductForm.value.price = '';
        createProductForm.value.quantity = '';
        createProductForm.value.collections = '';
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
    }

    const clearAddToCartForm = () => {
        addToCartForm.colors = {
            hex: '',
            colorName: ''
        };
        addToCartForm.sizes = '';

        addToCartFormMessages.value.colorMessage = '';
        addToCartFormMessages.value.sizeMessage = '';

        addCartFormErrors.value.colorError = false;
        addCartFormErrors.value.sizeError = false;
    }

    const clearSearchForm = () => {
        searchProductForm.value.search = '';
    }

    return{
        clearProductForm,
        clearAddToCartForm,
        clearSearchForm
    }
}