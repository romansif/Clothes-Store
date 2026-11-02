import type { ColorItem, Product } from "@/shared";

interface CartRow {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    checked: boolean;
    created_at: string;
    color: ColorItem;
    size: string;
}

export interface CartItem extends Omit<Product, keyof CartRow>, CartRow {
    sellerId: string;
}
