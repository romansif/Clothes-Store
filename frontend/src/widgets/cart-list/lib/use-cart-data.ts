import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";

export const useCartData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: cart,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: computed(() => ["cart", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getCartProducts(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        cart: computed(() => cart.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};
