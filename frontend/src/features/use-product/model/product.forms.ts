import { reactive, ref } from 'vue'
import type { ProductForm, ProductColor, ProductFormMessage } from "@/entities/product/model/product.types.form.ts";
import type {Variant} from "@/entities/product/model/product.types.ts";

const createProductForm = ref<ProductForm>({
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

const moreCreateItem = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
    variants: [] as Variant[],
})

const createProductFormMessages = ref<ProductFormMessage>({
    productUrlMessage: '',
    titleMessage: '',
    categoryMessage: '',
    materialMessage: '',
    descriptionMessage: '',
    priceMessage: '',
    colorMessage: '',
    sizeMessage: '',
    genderMessage: '',
    variantMessage: '',
    skuMessage: '',
    collectionsMessage: '',
})

export const productForms = () => {
    return {
        createProductForm,
        moreCreateItem,
        createProductFormMessages,
    }
}