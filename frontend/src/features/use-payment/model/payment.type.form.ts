export interface PaymentForm {
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

export interface PaymentFormErrorMessage {
    cardNumberMessage: string,
    expiryDateMessage: string,
    cardCvvMessage: string,
    paymentMethodMessage: string,
}

export interface PaymentFormError {
    cardNumberError: boolean,
    expiryDateError: boolean,
    cardCvvError: boolean,
    paymentMethodError: boolean,
}