import { reactive, ref } from 'vue'
import type { ProductForm, ProductColor, ProductFormMessage } from "@/entities/product/product.types.form.ts";

const createProductForm = ref<ProductForm>({
    productUrl: '',
    title: '',
    category: '',
    material: '',
    description: '',
    price: '',
    gender: '',
    quantity: '',
    collection: '',
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