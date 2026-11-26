import type { SoldStats } from "@/shared/model";

import { handler } from "@/shared/api";

export const getSoldStats = async () => {
  return await handler<SoldStats[]>("/orders/stats/products", {
    method: "GET",
  });
};
