export interface PaymentForm {
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

export interface PaymentFormErrorMessage {
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

export interface PaymentFormError {
    cardNumber: boolean,
    expiryDate: boolean,
    cardCvv: boolean,
    paymentMethod: boolean,
}