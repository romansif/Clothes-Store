import { reactive, ref } from "vue";
import type { Variant } from "@/shared";

import type {
    MoreCreateItemFormErrorMessage,
    ProductColor,
    ProductForm,
    ProductFormErrorMessage,
} from "@/entities/product-form";

export const createProductForm = ref<ProductForm>({
    title: "",
    category: "",
    material: "",
    description: "",
    price: 0,
    gender: "",
    sku: "",
    quantity: 0,
    collections: {
        season: "",
        condition: "",
        name: "",
    },
});

export const moreCreateItemForm = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
    variants: [] as Variant[],
});

export const createProductFormErrorMessages = ref<ProductFormErrorMessage>({
    title: "",
    category: "",
    material: "",
    description: "",
    price: "",
    gender: "",
    sku: "",
    quantity: "",
    collections: "",
});

export const moreCreateItemFormErrorMessages = ref<MoreCreateItemFormErrorMessage>({
    colors: "",
    sizes: "",
    variants: "",
});
