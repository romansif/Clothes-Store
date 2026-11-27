import type { SellerOrderProps } from "@/shared/model";
import { handler } from "@/shared/api";

export const getSellerOrders = async () => {
  return await handler<SellerOrderProps[]>(`/orders/seller/items`, {
    method: "GET",
  });
};
