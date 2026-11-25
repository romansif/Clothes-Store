
import { paymentForm } from "@/entities/checkout-payment-form/model/payment-form";

type PaymentForm = typeof paymentForm.value;

export const EDITABLE_CARD: (keyof PaymentForm)[] = [
    "cardName",
    "cardNumber",
    "expiryDate",
];