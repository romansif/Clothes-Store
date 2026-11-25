import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getSellerOrders } from "@/features/order-dashboard/api/get-seller-orders";

export const useSellerOrderData = () => {
  const {
    data: sellerItems,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sellerItems"],

    queryFn: () => {
      return getSellerOrders();
    },
  });

  return {
    sellerItems: computed(() => sellerItems.value ?? []),
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
