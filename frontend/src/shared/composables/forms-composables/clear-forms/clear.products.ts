import { productsForms } from "../products.forms.ts";
import { productsFormErrors } from "../forms-errors/products.errors.ts";

const { createProductFormErrors } = productsFormErrors();
const { createProductForm, createProductFormMessages, searchProductForm } = productsForms();

export const clearProductsForms = () => {
    const clearProductForm = () => {
        createProductForm.value.title = ''
        createProductForm.value.category = ''
        createProductForm.value.material = ''
        createProductForm.value.description = ''
        createProductForm.value.price = ''
        createProductForm.value.color = ''

        createProductFormMessages.value.titleMessage = ''
        createProductFormMessages.value.colorMessage = ''
        createProductFormMessages.value.materialMessage = ''
        createProductFormMessages.value.descriptionMessage = ''
        createProductFormMessages.value.priceMessage = ''
        createProductFormMessages.value.colorMessage = ''
        createProductFormMessages.value.sizeMessage = ''

        createProductFormErrors.value.titleError = false
        createProductFormErrors.value.categoryError = false
        createProductFormErrors.value.materialError = false
        createProductFormErrors.value.descriptionError = false
        createProductFormErrors.value.priceError = false
        createProductFormErrors.value.colorError = false
        createProductFormErrors.value.sizeError = false
    }

    const clearSearchForm = () => {
        searchProductForm.value.search = ''
    }

    return{
        clearProductForm,
        clearSearchForm
    }
}