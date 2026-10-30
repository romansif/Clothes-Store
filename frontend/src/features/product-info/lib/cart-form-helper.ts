import type { Product } from "@/shared";

import type { CartItem } from "@/entities/cart-item";

export const isInCart = (cart: CartItem[], product: Product) => {
    if (!cart || !product?.id) return;

    return cart.find((item) => item.productId === product.id);
};
