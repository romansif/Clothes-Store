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

interface ProductColor {
    hex: string
    colorName: string
}

interface AddForm {
    colors: ProductColor,
    sizes: string,
}


interface SearchForm {
    search: string
}

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

interface AddFormMessage {
    colorMessage: string,
    sizeMessage: string,
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


const moreCreateItem = reactive({
    colors: [] as ProductColor[],
    sizes: [] as string[],
})

const addToCartForm = ref<AddForm>({
    colors: {
        hex: '',
        colorName: '',
    },
    sizes: '',
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

const addToCartFormMessages = ref<AddFormMessage>({
    colorMessage: '',
    sizeMessage: '',
})

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