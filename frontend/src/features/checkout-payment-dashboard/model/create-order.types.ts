import type { Product } from "@/shared/model";

import type { CartItem } from "@/shared/model";

export type UpdateCartAndProductPayload = {
  cart: CartItem[];
  products: Product[];
};
