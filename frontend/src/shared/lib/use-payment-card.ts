import type { UserPayment } from "@/entities/checkout-payment-form";

export const havePayments = (payments: UserPayment[]) => {
    return payments.some(payment => payment.cardNumber !== undefined);
}

export const paymentCards = (payments: UserPayment[]) => {
    return payments.filter(payment => payment.cardNumber !== undefined);
}