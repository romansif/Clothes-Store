import { ref } from 'vue'
import type { ProductFormError } from "@/feature/products/model/product.types.ts";

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

export const productsFormErrors = () => {
    return {
        createProductFormErrors,
    }
}