import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getSoldStats } from "@/shared/api";

export const useSoldStatsData = () => {
  const { data: productSold } = useQuery({
    queryKey: ["productSold"],
    queryFn: () => getSoldStats(),
  });

  return {
    productSold: computed(() => productSold.value ?? []),
  };
};
