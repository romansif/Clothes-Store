import { ref } from 'vue'
import type { ProductFormError } from "@/features/use-product-form/model/product.types.form.ts";

export const createProductFormErrors = ref<ProductFormError>({
    title: false,
    category: false,
    material: false,
    description: false,
    sku: false,
    price: false,
    color: false,
    size: false,
    gender: false,
    quantity: false,
    variant: false,
    collections: false,
})
