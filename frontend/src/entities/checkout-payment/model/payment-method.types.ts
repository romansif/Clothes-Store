export type PaymentMethod = 'card' | 'apple' | 'google' | 'paypal'

export interface PaymentMethodDescriptionProps {
    method: string
    title: string,
    text: string,
    paymentImg: string,
}

export interface PaymentMethodProps {
    card: PaymentMethodDescriptionProps,
    apple: PaymentMethodDescriptionProps,
    google:  PaymentMethodDescriptionProps,
    paypal:  PaymentMethodDescriptionProps,
}