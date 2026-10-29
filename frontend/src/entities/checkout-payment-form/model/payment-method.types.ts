export type PaymentMethods = "card" | "apple" | "google" | "paypal";

export interface PaymentMethodDescriptionProps {
    method: PaymentMethods;
    title: string;
    text: string;
    paymentImg: string;
}

export interface PaymentMethodProps {
    apple: PaymentMethodDescriptionProps;
    google: PaymentMethodDescriptionProps;
    paypal: PaymentMethodDescriptionProps;
}
