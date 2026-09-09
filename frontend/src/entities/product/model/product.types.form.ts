import type {Collection, Variant} from "@/entities/product/model/product.types.ts";

export interface ProductForm {
    productUrl: string,
    title: string,
    category: string,
    material: string,
    gender: string,
    sku: string,
    price: string,
    description: string,
    quantity: number
    variants: Variant[],
    collection: Collection,
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
    skuMessage: string,
    quantityMessage: string,
    variantMessage: string,
    collectionsMessage: string,
}

export interface ProductFormError {
    titleError: boolean,
    categoryError: boolean,
    materialError: boolean,
    descriptionError: boolean,
    priceError: boolean,
    colorError: boolean,
    sizeError: boolean,
    genderError: boolean,
    skuError: boolean,
    quantityError: boolean,
    variantError: boolean,
    collectionsError: boolean,
}
