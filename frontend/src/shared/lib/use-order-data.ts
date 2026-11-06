import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { useGetOrder } from "@/shared/api/get-order";

const { getAllOrder, getOrders, getActiveOrders, getOrderItems } = useGetOrder();

export const useAllOrdersData = () => {
  const { data: allOrders } = useQuery({
    queryKey: ["allOrders"],
    queryFn: () => getAllOrder(),
  });

  return {
    allOrders: computed(() => allOrders.value ?? []),
  };
};

export const useOrderData = () => {
  const userId = localStorage.getItem("userId");

  const {
    data: orders,
    isLoading,
    isFetching,
    isError,
    refetch,
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
    refetch,
  };
};

export const useActiveOrderData = () => {
  const userId = localStorage.getItem("userId");

  const {
    data: activeOrders,
    isLoading,
    isFetching,
    isError,
    refetch,
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
    refetch,
  };
};

export const useOrderItemsData = (orderId: string) => {
  const {
    data: orderItems,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: computed(() => ["orderItems", orderId]),

    queryFn: () => {
      if (!orderId) {
        throw new Error("Пользователь не зарегистрирован");
      }

      return getOrderItems(orderId);
    },

    enabled: computed(() => Boolean(orderId)),
  });

  return {
    orderItems: computed(() => orderItems.value ?? []),
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
