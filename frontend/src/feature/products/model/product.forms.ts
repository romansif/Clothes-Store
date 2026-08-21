import { reactive, ref } from 'vue'
import type { ProductForm, ProductColor, ProductFormMessage } from "@/feature/products/model/product.types.ts";

const createProductForm = ref<ProductForm>({
    productUrl: '',
    title: '',
    category: '',
    material: '',
    description: '',
    price: '',
    gender: '',
    quantity: '',
    collections: '',
})


const moreCreateItem = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
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
    quantityMessage: '',
    collectionsMessage: '',
})


export const productForms = () => {
    return {
        createProductForm,
        moreCreateItem,
        createProductFormMessages,
    }
}