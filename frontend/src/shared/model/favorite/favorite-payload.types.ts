import type { FavoriteItem, Product } from "@/shared/model";

export type ToggleToFavoritePayload = {
  favorite: FavoriteItem[];
  product: Product;
};
