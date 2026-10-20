export type CheckoutInputVariant = 'contactInfo' | 'payment'

export interface CheckoutInputProps {
    variant?: CheckoutInputVariant
    errorMessage?: string;
}