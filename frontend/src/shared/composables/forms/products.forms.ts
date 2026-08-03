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
})

const moreCreateItem = reactive({
    color: [] as string[],
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
})

interface AddForm {
    color: string,
    size: string,
}

const addToCartForm = ref<AddForm>({
    color: '',
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