import type { Product } from "@/shared/model";

import type { CartItem } from "@/entities/cart-item";

export type UpdateCartAndProductPayload = {
  cart: CartItem[];
  products: Product[];
};
