import { reactive, ref } from 'vue'
import type {
    ProductForm,
    ProductColor,
    ProductFormErrorMessage,
    MoreCreateItemFormErrorMessage, ProductFormError, MoreCreateItemFormError
} from "@/features/use-product-form/model/product.types.form.ts";
import type { Variant } from "@/features/use-product/model/product.types.ts";

export const createProductForm = ref<ProductForm>({
    title: '',
    category: '',
    material: '',
    description: '',
    price: 0,
    gender: '',
    sku: '',
    quantity: 0,
    collections: {
        season: '',
        condition: '',
        name: '',
    },
});

export const moreCreateItemForm = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
    variants: [] as Variant[],
});

export const createProductFormErrorMessages = ref<ProductFormErrorMessage>({
    title: '',
    category: '',
    material: '',
    description: '',
    price: '',
    gender: '',
    sku: '',
    quantity: '',
    collections: '',
});

export const moreCreateItemFormErrorMessages = ref<MoreCreateItemFormErrorMessage>({
    colors: '',
    sizes: '',
    variants: ''
});

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