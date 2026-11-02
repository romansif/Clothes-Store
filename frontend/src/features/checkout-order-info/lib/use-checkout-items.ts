import { computed } from "vue";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import type { CartItem } from "@/entities/cart-item";

export const useCheckoutItems = () => {
    const { cart } = useCartData();

    const checkoutItems = computed<CartItem[]>(() =>
        cart.value.filter((item: CartItem) => item.checked),
    );

    return {
        checkoutItems
    };
};
