import apple_pay from "@/assets/icons/checkout/payment/method/applepay.png";
import google_pay from "@/assets/icons/checkout/payment/method/googlepay.png";
import pay_pal from "@/assets/icons/checkout/payment/method/paypal.png";
import visa_pay from "@/assets/icons/checkout/payment/method/visa.png";

import type {
    PaymentMethodDescriptionProps,
    PaymentMethodProps,
} from "@/entities/checkout-payment-form";

export const paymentCardMethod: PaymentMethodDescriptionProps = {
    method: "card",
    title: "DEBIT OR CREDIT CARD",
    text: "Visa, Mastercard",
    paymentImg: visa_pay,
};

export const paymentMethods: PaymentMethodProps = {
    apple: {
        method: "apple",
        title: "APPLE PAY",
        text: "Fast payment with Apple",
        paymentImg: apple_pay,
    },
    google: {
        method: "google",
        title: "GOOGLE PAY",
        text: "Payment via Google account",
        paymentImg: google_pay,
    },
    paypal: {
        method: "paypal",
        title: "PAYPAL",
        text: "International wallet",
        paymentImg: pay_pal,
    },
};

export const allPaymentMethods: PaymentMethodDescriptionProps[] = [
    paymentCardMethod,
    ...Object.values(paymentMethods),
];
