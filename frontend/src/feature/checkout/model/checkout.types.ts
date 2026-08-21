export interface Information {
    addressName: string
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: string,
}

export interface Shipping {
    delivery: string,
}

export interface Payment {
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

export interface InformationMessages {
    emailMessage: string,
    phoneMessage: string,
    firstNameMessage: string,
    lastNameMessage: string,
    countryMessage: string,
    stateRegionMessage: string,
    addressMessage: string,
    cityMessage: string,
    postalCodeMessage: string,
}

export interface ShippingMessage {
    deliveryMessage: string,
}

export interface PaymentMessage {
    cardNumberMessage: string,
    expiryDateMessage: string,
    cardCvvMessage: string,
    paymentMethodMessage: string,
}

export interface IsAgree {
    agreeMessage: string,
}

export interface InformationErrors {
    emailError: boolean,
    phoneError: boolean,
    firstNameError: boolean,
    lastNameError: boolean,
    countryError: boolean,
    stateRegionError: boolean,
    addressError: boolean,
    cityError: boolean,
    postalCodeError: boolean,
}

export interface ShippingError {
    deliveryError: boolean
}

export interface PaymentError {
    cardNumberError: boolean,
    expiryDateError: boolean,
    cardCvvError: boolean,
    paymentMethodError: boolean,
}

export interface IsAgreeError {
    agreeError: boolean,
}

export interface UserCheckoutAddress {
    id: string,
    userId: string
    email: string,
    phone: string,
    addressName: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: number,
}

export interface UserCheckoutShipping {
    id: string,
    userId: string
    paymentId: string,
    delivery: string,
}

export interface UserCheckoutPayment {
    id: string,
    userId: string,
    paymentId: string,
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: number,
    paymentMethod: string,
}