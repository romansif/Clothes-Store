import type { Product } from "@/shared";

import type { FavoriteItem } from "@/entities/favorite-item";

export type ToggleToFavoritePayload = {
    favorite: FavoriteItem[];
    product: Product;
};
