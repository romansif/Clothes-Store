import type { Product } from "@/shared/model";

import type { FavoriteItem } from "@/shared/model";

export type ToggleToFavoritePayload = {
  favorite: FavoriteItem[];
  product: Product;
};
