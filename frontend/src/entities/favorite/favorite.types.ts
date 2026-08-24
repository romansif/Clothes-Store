import type { ColorItem, ImageItem } from "@/entities/product/product.types.ts";

export interface FavoriteItem {
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
    favorite: boolean,
    checked: boolean,
    collection: string,
    created_at: string,
}