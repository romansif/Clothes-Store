import type { UserPayment } from "@/entities/user-payment";
import { handler } from "@/shared/api";

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
