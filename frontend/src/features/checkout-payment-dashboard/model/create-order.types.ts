import type { CartItem, Product } from "@/shared/model";

export type UpdateCartAndProductPayload = {
  cart: CartItem[];
  products: Product[];
};
