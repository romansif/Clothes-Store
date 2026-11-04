import apple_pay from "@/assets/icons/checkout/payment/method/applepay.png";
import google_pay from "@/assets/icons/checkout/payment/method/googlepay.png";
import pay_pal from "@/assets/icons/checkout/payment/method/paypal.png";
import visa_pay from "@/assets/icons/checkout/payment/method/visa.png";

import type { PaymentMethodDescriptionProps, PaymentMethodProps } from "@/entities/checkout-payment-form";

export const paymentCardMethod: PaymentMethodDescriptionProps = {
  method: "card",
  title: "paymentMethod.card.title",
  text: "paymentMethod.card.description",
  paymentImg: visa_pay,
};

export const paymentMethods: PaymentMethodProps = {
  apple: {
    method: "apple",
    title: "paymentMethod.apple.title",
    text: "paymentMethod.apple.description",
    paymentImg: apple_pay,
  },
  google: {
    method: "google",
    title: "paymentMethod.google.title",
    text: "paymentMethod.google.description",
    paymentImg: google_pay,
  },
  paypal: {
    method: "paypal",
    title: "paymentMethod.paypal.title",
    text: "paymentMethod.paypal.description",
    paymentImg: pay_pal,
  },
};

export const allPaymentMethods: PaymentMethodDescriptionProps[] = [paymentCardMethod, ...Object.values(paymentMethods)];
