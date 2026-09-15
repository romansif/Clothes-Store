import type { Collection } from "@/features/use-product/model/product.types";

export interface ProductForm {
    title: string,
    category: string,
    material: string,
    gender: string,
    sku: string,
    price: number,
    description: string,
    quantity: number
    collections: Collection,
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
    colors: string,
    sizes: string,
    gender: string,
    sku: string,
    quantity: string,
    variants: string,
    collections: string,
}

export interface ProductFormError {
    title: boolean,
    category: boolean,
    material: boolean,
    description: boolean,
    price: boolean,
    colors: boolean,
    sizes: boolean,
    gender: boolean,
    sku: boolean,
    quantity: boolean,
    variants: boolean,
    collections: boolean,
}
