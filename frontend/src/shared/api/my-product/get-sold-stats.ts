import { handler } from "@/shared/api";
import type { SoldStats } from "@/shared/model";

export const getSoldStats = async () => {
  return await handler<SoldStats[]>("/orders/stats/products", {
    method: "GET",
  });
};
