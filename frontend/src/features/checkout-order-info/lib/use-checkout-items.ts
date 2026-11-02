import { computed } from "vue";
import { queryClient } from "@/shared/api/query-client";
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

export const getCheckoutItems = (): CartItem[] => {
    const userId = localStorage.getItem("userId");

    const cart = queryClient.getQueryData<CartItem[]>(["cart", userId]) ?? [];
    return cart.filter((item) => item.checked);
};
