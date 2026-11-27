import { handler } from "@/shared/api";
import type { SellerOrderProps } from "@/shared/model";

export const getSellerOrders = async () => {
  return await handler<SellerOrderProps[]>(`/orders/seller/items`, {
    method: "GET",
  });
};
