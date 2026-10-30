import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useGetOrder } from "@/widgets/order-list/api/get-order";

const { getOrders, getActiveOrders } = useGetOrder();

export const useOrderData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: orders,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: computed(() => ["orders", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getOrders(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        orders: computed(() => orders.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};

export const useActiveOrderData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: activeOrders,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: computed(() => ["activeOrders", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getActiveOrders(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        activeOrders: computed(() => activeOrders.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};
