import { computed } from "vue";

import { useSoldStatsData } from "@/shared/lib/use-sold-stats-data";

export const useSoldItem = () => {
  const { productSold } = useSoldStatsData();

  const soldQuantity = computed(() => Object.values(productSold.value).reduce((sum, s) => sum + s.sold, 0));

  const soldTotalPrice = computed(() => Object.values(productSold.value).reduce((sum, s) => sum + s.revenue, 0));

  const inOrdersQuantity = computed(() => Object.values(productSold.value).reduce((sum, s) => sum + s.inOrders, 0));

  return {
    soldQuantity,
    soldTotalPrice,
    inOrdersQuantity,
  };
};
