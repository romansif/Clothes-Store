import { paymentForm } from "@/entities/checkout-payment-form";

type PaymentForm = typeof paymentForm.value;

export const EDITABLE_CARD: (keyof PaymentForm)[] = ["cardName", "cardNumber", "expiryDate"];
