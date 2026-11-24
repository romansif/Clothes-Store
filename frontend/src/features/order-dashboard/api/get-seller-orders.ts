import { handler } from "@/shared/api/http";
import type { SellerOrderItem } from "@/entities/order";

export const getSellerOrders = async () => {
    return await handler<SellerOrderItem[]>(`/orders/seller/items`, {
        method: "GET",
    });
}