import { handler } from "@/shared/api/http";
import type { UserShipping } from "@/entities/checkout-shipping";

export const getShipping = async (paymentId: string) => {
    return await handler<UserShipping>(`/shipping/${paymentId}`, {
        method: "GET",
    });
};
