import { reactive, ref } from 'vue'
import type { ProductForm, ProductColor, ProductFormErrorMessage} from "@/features/use-product-form/model/product.types.form.ts";
import type { Variant } from "@/features/use-product/model/product.types.ts";

export const createProductForm = ref<ProductForm>({
    productUrl: '',
    title: '',
    category: '',
    material: '',
    description: '',
    price: '',
    gender: '',
    sku: '',
    quantity: 0,
// @ts-ignore
    collection: '',
})

export const moreCreateItemForm = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
    variants: [] as Variant[],
})

export const createProductFormErrorMessages = ref<ProductFormErrorMessage>({
    title: '',
    category: '',
    material: '',
    description: '',
    price: '',
    color: '',
    size: '',
    gender: '',
    sku: '',
    quantity: '',
    variant: '',
    collections: '',
})
