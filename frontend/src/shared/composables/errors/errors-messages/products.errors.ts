import { ref } from 'vue'

interface ProductFormError {
    productUrlError: boolean,
    titleError: boolean,
    categoryError: boolean,
    materialError: boolean,
    descriptionError: boolean,
    priceError: boolean,
    colorError: boolean,
    sizeError: boolean,
    genderError: boolean,
    quantityError: boolean,
    collectionsError: boolean,
}

const createProductFormErrors = ref<ProductFormError>({
    productUrlError: false,
    titleError: false,
    categoryError: false,
    materialError: false,
    descriptionError: false,
    priceError: false,
    colorError: false,
    sizeError: false,
    genderError: false,
    quantityError: false,
    collectionsError: false,
})

interface AddFormError {
    colorError: boolean,
    sizeError: boolean,
}

const addCartFormErrors = ref<AddFormError>({
    colorError: false,
    sizeError: false,
})

export const productsFormErrors = () => {
    return {
        createProductFormErrors,
        addCartFormErrors,
    }
}