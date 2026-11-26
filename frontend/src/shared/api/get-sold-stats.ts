import type { SoldStats } from "@/shared/model";

import { handler } from "@/shared/api/http";

export const getSoldStats = async () => {
  return await handler<SoldStats[]>("/orders/stats/products", {
    method: "GET",
  });
};
