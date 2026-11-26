import type { Product } from "@/shared/model";

import type { FavoriteItem } from "@/entities/favorite-item";

export type ToggleToFavoritePayload = {
  favorite: FavoriteItem[];
  product: Product;
};
