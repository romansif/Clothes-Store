import type { FavoriteItem } from "@/entities/favroite-item";
import type { Product } from "@/shared";

export type ToggleToFavoritePayload =  {
    favorite: FavoriteItem[]
    product: Product
}