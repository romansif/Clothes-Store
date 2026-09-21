import { reactive, ref } from 'vue'
import type {
    ProductForm,
    ProductColor,
    ProductFormErrorMessage,
    MoreCreateItemFormErrorMessage,
} from "@/entities/product-form/model/product.types.form.ts";
import type { Variant } from "@/entities/product/model/product.types.ts";

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

