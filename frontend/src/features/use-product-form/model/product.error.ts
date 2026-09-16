import { ref } from 'vue'
import type {
    MoreCreateItemFormError,
    ProductFormError
} from "@/features/use-product-form/model/product.types.form.ts";

export const createProductFormErrors = ref<ProductFormError>({
    title: false,
    collections: false,
    category: false,
    material: false,
    gender: false,
    sku: false,
    price: false,
    description: false,
    quantity: false,
})

export const moreCreateItemFormErrors = ref<MoreCreateItemFormError>({
    colors: false,
    sizes: false,
    variants: false
})