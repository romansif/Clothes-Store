import { type ColorItem, type ImageItem } from "@/feature/products/model/product.types.ts";
import { type ProductColor } from "@/feature/products/model/product.types.ts";

export interface AddForm {
    colors: ProductColor,
    sizes: string,
}

export interface AddFormMessage {
    colorMessage: string,
    sizeMessage: string,
}

export interface AddFormError {
    colorError: boolean,
    sizeError: boolean,
}

export interface CartItem {
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
    collection: string,
    created_at: string,
}