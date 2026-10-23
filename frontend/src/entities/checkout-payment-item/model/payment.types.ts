export interface UserPayment {
    id: string,
    userId: string,
    paymentId: string,
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: number,
    paymentMethod: string,
}