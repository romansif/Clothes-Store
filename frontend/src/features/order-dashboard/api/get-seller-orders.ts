import { handler } from "@/shared/api/http";
import type { SellerOrderProps } from "@/entities/order/model/order.types";

export const getSellerOrders = async () => {
    return await handler<SellerOrderProps[]>(`/orders/seller/items`, {
        method: "GET",
    });
}