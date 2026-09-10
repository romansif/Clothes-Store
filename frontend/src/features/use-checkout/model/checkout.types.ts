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