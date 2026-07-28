import { productsForms } from "../forms/products.forms.ts";
import { productsFormErrors } from "../forms-errors/products.errors.ts";

const { createProductFormErrors, addCartFormErrors } = productsFormErrors();
const { createProductForm, addToCartForm, addToCartFormMessages, moreCreateItem, createProductFormMessages, searchProductForm } = productsForms();

export const clearProductsForms = () => {
    const clearProductForm = () => {
        createProductForm.value.title = ''
        createProductForm.value.category = ''
        createProductForm.value.material = ''
        createProductForm.value.description = ''
        createProductForm.value.price = ''
        createProductForm.value.quantity = 0
        moreCreateItem.size = []
        moreCreateItem.color = []

        createProductFormMessages.value.titleMessage = ''
        createProductFormMessages.value.colorMessage = ''
        createProductFormMessages.value.materialMessage = ''
        createProductFormMessages.value.descriptionMessage = ''
        createProductFormMessages.value.priceMessage = ''
        createProductFormMessages.value.colorMessage = ''
        createProductFormMessages.value.sizeMessage = ''
        createProductFormMessages.value.quantityMessage = ''

        createProductFormErrors.value.titleError = false
        createProductFormErrors.value.categoryError = false
        createProductFormErrors.value.materialError = false
        createProductFormErrors.value.descriptionError = false
        createProductFormErrors.value.priceError = false
        createProductFormErrors.value.colorError = false
        createProductFormErrors.value.sizeError = false
        createProductFormErrors.value.quantityError = false
    }

    const clearAddToCartForm = () => {
        addToCartForm.value.color = ''
        addToCartForm.value.size = ''

        addToCartFormMessages.value.colorMessage = ''
        addToCartFormMessages.value.sizeMessage = ''

        addCartFormErrors.value.colorError = false
        addCartFormErrors.value.sizeError = false
    }

    const clearSearchForm = () => {
        searchProductForm.value.search = ''
    }

    return{
        clearProductForm,
        clearAddToCartForm,
        clearSearchForm
    }
}