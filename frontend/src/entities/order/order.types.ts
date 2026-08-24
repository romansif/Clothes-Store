import type { ColorItem, ImageItem } from "@/entities/products/product.types.ts";

export interface OrderItem {
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
    collection: string,
    created_at: string,
}

export interface Order {
    id: string,
    userId: string,
    productId: string,
    orderItems: OrderItem[],
    orderTotal: number,
    delivery: string,
    created_at: string,
    date_created_at: string,
    time_created_at: string,
    cancelled_at: string,
    date_cancelled_at: string,
    time_cancelled_at: string,
    status: string
}