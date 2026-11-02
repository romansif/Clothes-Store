import type { Product } from "@/shared";

interface FavoriteRow {
    id: string;
    userId: string;
    productId: string;
    created_at: string;
}

export interface FavoriteItem extends Omit<Product, keyof FavoriteRow>, FavoriteRow {
    sellerId: string;
}