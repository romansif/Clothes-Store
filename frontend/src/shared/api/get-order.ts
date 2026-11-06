import type { OrderPosition, OrderProps } from "@/entities/order";
import { handler } from "@/shared/api/http";

export const useGetOrder = () => {
  const getAllOrder = () => {
    return handler<OrderProps[]>("/orders", {
      method: "GET",
    });
  };

  const getOrders = async (userId: string) => {
    return await handler<OrderProps[]>(`/orders/${userId}`, {
      method: "GET",
    });
  };

  const getActiveOrders = async (userId: string) => {
    return await handler<OrderProps[]>(`/orders/active/${userId}`, {
      method: "GET",
    });
  };

  const getOrderItems = async (orderId: string) => {
    return await handler<OrderPosition[]>(`/orders/${orderId}/items`, {
      method: "GET",
    });
  };

  return {
    getAllOrder,
    getOrders,
    getActiveOrders,
    getOrderItems,
  };
};
