import { ref } from 'vue'
import type { ProductFormError } from "@/features/use-product-form/model/product.types.form.ts";

export const createProductFormErrors = ref<ProductFormError>({
    title: false,
    collections: false,
    category: false,
    material: false,
    gender: false,
    sku: false,
    price: false,
    description: false,
    colors: false,
    sizes: false,
    quantity: false,
    variants: false,
})
