import { type ColorItem, type ImageItem } from "@/entities/products/product.types.ts";

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