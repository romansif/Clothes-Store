import type { UserPayment } from "@/shared/model";

export const havePayments = (payments: UserPayment[]) => {
  return payments.some((payment) => payment.cardNumber !== undefined);
};

export const paymentCards = (payments: UserPayment[]) => {
  return payments.filter((payment) => payment.cardNumber !== undefined);
};
