import type { Collection, Variant } from "@/features/use-product/model/product.types";

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

export interface ProductFormErrorMessage {
    title: string,
    category: string,
    material: string,
    description: string,
    price: string,
    color: string,
    size: string,
    gender: string,
    sku: string,
    quantity: string,
    variant: string,
    collections: string,
}

export interface ProductFormError {
    title: boolean,
    category: boolean,
    material: boolean,
    description: boolean,
    price: boolean,
    color: boolean,
    size: boolean,
    gender: boolean,
    sku: boolean,
    quantity: boolean,
    variant: boolean,
    collections: boolean,
}
