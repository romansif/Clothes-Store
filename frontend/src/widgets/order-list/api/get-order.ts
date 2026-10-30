import type { Order } from "@/entities/order";
import { handler } from "@/shared/api/http";

export const useGetOrder = () => {
    const getOrders = async (userId: string) => {
        return await handler<Order[]>(`/orders/${userId}`, {
            method: "GET",
        });
    };

    const getActiveOrders = async (userId: string) => {
        return await handler<Order[]>(`/orders/active/${userId}`, {
            method: "GET",
        });
    };

    return {
        getOrders,
        getActiveOrders,
    };
};
