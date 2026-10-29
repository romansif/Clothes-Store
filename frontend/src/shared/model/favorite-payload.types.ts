import type { FavoriteItem } from "@/entities/favorite-item";
import type { Product } from "@/shared";

export type ToggleToFavoritePayload =  {
    favorite: FavoriteItem[]
    product: Product
}