import type { PaymentMethods } from "@/entities/checkout-payment";

export interface PaymentForm {
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: PaymentMethods | '',
}

export interface PaymentFormErrorMessage {
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}
