import type {PaymentValueTypes} from "@/entities/checkout-payment/model/payment.value.types.ts";

export const paymentMethods = {
    card: {
        method: "card",
        title: "DEBIT OR CREDIT CARD",
        text: "Visa, Mastercard",
    },

    apple: {
        method: "apple",
        title: "APPLE PAY",
        text: "Fast payment with Apple",
    },

    google: {
        method: "google",
        title: "GOOGLE PAY",
        text: "Payment via Google account",
    },

    paypal: {
        method: "paypal",
        title: "PAYPAL",
        text: "International wallet"
    },
} satisfies Record<PaymentValueTypes, {
    method: string,
    title: string,
    text: string
}>