import { computed, toValue } from "vue";

import { useSoldStatsData } from "@/shared/lib";

export const useSoldItem = (product_id: string) => {
  const { productSold } = useSoldStatsData();

  const stats = computed(() => productSold.value.find((s) => s.productId === toValue(product_id)));

  return {
    soldItemQuantity: computed(() => stats.value?.sold ?? 0),
    soldItemTotalPrice: computed(() => stats.value?.revenue ?? 0),
    inOrdersItemQuantity: computed(() => stats.value?.inOrders ?? 0),
  };
};

export const useSoldItems = () => {
  const { productSold } = useSoldStatsData();

  const totalSoldQuantity = computed(() => Object.values(productSold.value).reduce((sum, s) => sum + s.sold, 0));

  const totalSoldTotalPrice = computed(() => Object.values(productSold.value).reduce((sum, s) => sum + s.revenue, 0));

  return {
    totalSoldQuantity,
    totalSoldTotalPrice,
  };
};
