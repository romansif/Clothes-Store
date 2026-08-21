export interface ProductForm {
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

export interface ProductColor {
    hex: string
    colorName: string
}

export interface ProductFormMessage {
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

export interface ProductFormError {
    productUrlError: boolean,
    titleError: boolean,
    categoryError: boolean,
    materialError: boolean,
    descriptionError: boolean,
    priceError: boolean,
    colorError: boolean,
    sizeError: boolean,
    genderError: boolean,
    quantityError: boolean,
    collectionsError: boolean,
}

export interface ColorItem {
    hex: string,
    colorName: string,
}

export interface ImageItem {
    url: string,
}

export interface Product {
    id: string,
    userId: string,
    productId: string,
    title: string,
    category: string,
    material: string,
    description: string,
    images: ImageItem[],
    price: number,
    colors: ColorItem[],
    sizes: string,
    gender: string,
    quantity: number,
    status: string,
    checked: boolean,
    collections: string,
    created_at: string,
}

export interface Collection {
    collection: string,
}

export interface Category {
    category: string,
}

export interface Material {
    material: string,
}

export interface Gender {
    gender: string,
}


export interface Sizes {
    isActive: boolean,
    name: string,
    url: string,
    class: string,
}