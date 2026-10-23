import { cartStore } from "@/widgets/cart-list/model/cart.store";
import type { Product } from "@/shared";

const { cart } = cartStore();

export const isInCart = (product: Product) => {
    if (!cart.value || !product?.id) return;

    return cart.value.find(item => item.productId === product.id);
};

