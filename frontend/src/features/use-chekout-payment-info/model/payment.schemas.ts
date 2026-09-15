import { z } from "zod";

export const addPaymentSchema = z.object({
    paymentMethod: z
        .literal('card'),

    cardNumber: z
        .string()
        .trim()
        .min(1, 'Enter the card number'),

    expiryDate: z
        .string()
        .trim()
        .min(1, "Enter the card's expiration date"),

    cardCvv: z
        .string()
        .trim()
        .min(3, 'Enter the card CVV')
        .max(4, 'Enter the card CVV'),
})




