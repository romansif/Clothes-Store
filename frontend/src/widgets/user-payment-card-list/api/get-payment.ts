import type { UserPayment } from "@/entities/user-payment/model/payment.types";
import { handler } from "@/shared/api/http";

export const useGetPayment = () => {
    const getPayments = async (userId: string) => {
        return await handler<UserPayment[]>(`/payment/${userId}`, {
            method: "GET",
        });
    };

    const getPayment = async (paymentId: string) => {
        return await handler<UserPayment>(`/payment/item/${paymentId}`, {
            method: "GET",
        });
    };

    return {
        getPayment,
        getPayments,
    };
};
