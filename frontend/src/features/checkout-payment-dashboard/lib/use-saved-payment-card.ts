import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import { paymentForm } from "@/entities/checkout-payment-form/model/payment-form";
import { isChosenPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import type { UserPayment } from "@/entities/user-payment/model/payment.types";

const { paymentId } = togglePaymentForm();

export const useSavedCard = (card: UserPayment) => {
    paymentId.value = card.id;

    paymentForm.value.cardName = card.cardName;
    paymentForm.value.cardNumber = card.cardNumber;
    paymentForm.value.expiryDate = card.expiryDate;
    paymentForm.value.cardCvv = String(card.cardCvv);

    isChosenPayment.value = true;
}

