import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getMyProducts } from "@/widgets/my-product-list/api/get-my-product";

export const useMyProductsData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: myProducts,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: computed(() => ["myProducts", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getMyProducts(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        myProducts: computed(() => myProducts.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch,
    };
};
