import { reactive, ref } from 'vue'

interface ProductForm {
    productUrl: string,
    title: string,
    category: string,
    material: string,
    description: string,
    price: string,
    gender: string,
    quantity: string,
    collections: string,
}
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

interface ProductColor {
    hex: string
    colorName: string
}

const moreCreateItem = reactive({
    color: [] as ProductColor[],
    size: [] as string[],
})

interface ProductFormMessage {
    productUrlMessage: string,
    titleMessage: string,
    categoryMessage: string,
    materialMessage: string,
    descriptionMessage: string,
    priceMessage: string,
    colorMessage: string,
    sizeMessage: string,
    genderMessage: string,
    quantityMessage: string,
    collectionsMessage: string,
}


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

interface AddColor {
    hex: string,
    colorName: string
}

interface AddForm {
    color: AddColor,
    size: string,
}

const addToCartForm = ref<AddForm>({
    color: {
        hex: '',
        colorName: '',
    },
    size: '',
})

interface AddFormMessage {
    colorMessage: string,
    sizeMessage: string,
}

const addToCartFormMessages = ref<AddFormMessage>({
    colorMessage: '',
    sizeMessage: '',
})

interface SearchForm {
    search: string
}

const searchProductForm = ref<SearchForm>({
    search: ''
})

export const productsForms = () => {
    return {
        createProductForm,
        moreCreateItem,
        createProductFormMessages,
        addToCartForm,
        addToCartFormMessages,
        searchProductForm,
    }
}