import { productsForms } from "../products.forms.ts";
import { productsFormErrors } from "../forms-errors/products.errors.ts";

const { createProductForm, searchProductForm } = productsForms()
const { createProductFormErrors } = productsFormErrors()
export const clearProductsForms = () => {
    const clearProductForm = () => {
        createProductForm.value.title = ''
        createProductForm.value.category = ''
        createProductForm.value.material = ''
        createProductForm.value.description = ''
        createProductForm.value.price = 0
        createProductForm.value.color = ''
        createProductForm.value.size = ''

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