import { ref } from 'vue'
import type { ProductFormError } from "@/features/use-product-form/model/product.types.form.ts";

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