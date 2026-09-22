import type { Collection } from "@/shared/model/product.types.ts";

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
    gender: string,
    sku: string,
    quantity: string,
    collections: string,
}

export interface MoreCreateItemFormErrorMessage {
    colors: string,
    sizes: string,
    variants: string,
}
