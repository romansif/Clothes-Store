import type { ColorItem, ImageItem } from "@/feature/products/model/product.store.ts";

export interface FavoriteItem {
    id: string,
    userId: string,
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
    collections: string,
    created_at: string,
}