import { ref } from 'vue'
import type { ProductFormError } from "@/entities/product/model/product.types.form.ts";

const createProductFormErrors = ref<ProductFormError>({
    titleError: false,
    categoryError: false,
    materialError: false,
    descriptionError: false,
    skuError: false,
    priceError: false,
    colorError: false,
    sizeError: false,
    genderError: false,
    quantityError: false,
    variantError: false,
    collectionsError: false,
})

export const productsFormErrors = () => {
    return {
        createProductFormErrors,
    }
}