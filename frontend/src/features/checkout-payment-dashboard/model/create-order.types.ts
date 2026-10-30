import type { Product } from "@/shared";

import type { CartItem } from "@/entities/cart-item";

export type UpdateCartAndProductPayload = {
    cart: CartItem[];
    products: Product[];
};
