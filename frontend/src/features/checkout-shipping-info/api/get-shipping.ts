import { handler } from "@/shared/api/http";

export const getShipping = async (paymentId: string) => {
    return await handler(`/shipping/${paymentId}`, {
        method: "GET",
    });
};

