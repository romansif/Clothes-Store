import type { SoldStats } from "@/shared";

import { handler } from "@/shared/api/http";

export const getSoldStats = async () => {
  return await handler<SoldStats[]>("/orders/stats/products", {
    method: "GET",
  });
};
