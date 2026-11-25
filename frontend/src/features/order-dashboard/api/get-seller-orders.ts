import type { SellerOrderProps } from "@/entities/order/model/order.types";
import { handler } from "@/shared/api/http";

export const getSellerOrders = async () => {
  return await handler<SellerOrderProps[]>(`/orders/seller/items`, {
    method: "GET",
  });
};
