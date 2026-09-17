import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

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