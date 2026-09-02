import type {Collection, ColorItem, ImageItem, Variant} from "@/entities/product/model/product.types.ts";

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
    quantity: Variant[],
    sku: string,
    status: string,
    checked: boolean,
    collection: Collection,
    created_at: string,
}