import type { CartItem } from "@/entities/cart-item";
import type { Product } from "@/shared";

export type UpdateCartAndProductPayload = {
    cart: CartItem[];
    products: Product[];
};
