import type { Variant } from "@/entities/product/model/product.types.ts";

export interface ProductForm {
    productUrl: string,
    title: string,
    category: string,
    material: string,
    description: string,
    price: string,
    gender: string,
    quantity: string,
    sku: string,
    variants: Variant[],
    collection: string,
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
    skuError: boolean,
    quantityError: boolean,
    collectionsError: boolean,
}
