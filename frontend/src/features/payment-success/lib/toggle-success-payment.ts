import { resetCheckoutSession } from "@/entities/checkout-session";
import { showSuccessFullPayment } from "@/features/payment-success/model/success-payment.refs";

export const closeSuccessFull = () => {
    showSuccessFullPayment.value = false
    resetCheckoutSession();
}