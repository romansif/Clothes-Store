import { cartStore } from "@/features/use-cart/model/cart.store";
import type { Product } from "@/shared";

const { cart } = cartStore();

export const cartHelper = () => {
    const isInCart = (product: Product) => {
        if (!cart.value || !product?.id) return;

        return cart.value.find(item => item.productId === product.id);
    };

    return {
        isInCart,
    }
}