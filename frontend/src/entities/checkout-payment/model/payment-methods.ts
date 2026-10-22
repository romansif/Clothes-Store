import type { PaymentMethodProps } from "@/entities/checkout-payment";

import visa_pay from '@/assets/icons/checkout/payment/visa.png';
import apple_pay from '@/assets/icons/checkout/payment/applepay.png';
import google_pay from '@/assets/icons/checkout/payment/googlepay.png';
import pay_pal from '@/assets/icons/checkout/payment/paypal.png';

export const paymentMethods: PaymentMethodProps = {
    card: {
        method: "card",
        title: "DEBIT OR CREDIT CARD",
        text: "Visa, Mastercard",
        paymentImg: visa_pay
    },
    apple: {
        method: "apple",
        title: "APPLE PAY",
        text: "Fast payment with Apple",
        paymentImg: apple_pay
    },
    google: {
        method: "google",
        title: "GOOGLE PAY",
        text: "Payment via Google account",
        paymentImg: google_pay
    },
    paypal: {
        method: "paypal",
        title: "PAYPAL",
        text: "International wallet",
        paymentImg: pay_pal
    },
}