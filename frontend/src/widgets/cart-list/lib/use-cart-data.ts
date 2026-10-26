import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { userData } from "@/shared/model/user.store";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";

export const useCartData = () => {
    const { data: cart } = useQuery({
        queryKey: computed(() => ['cart', userData.value?.id]),

        queryFn: () => {
            const userId = userData.value?.id;

            if (!userId) {
                throw new Error('User is not authenticated');
            }

            return getCartProducts(userId);
        },

        enabled: computed(() => Boolean(userData.value?.id)),
    });

    const cartItems = computed(() => cart.value ?? []);

    return {
        cart: cartItems,
    };
};

