import { paymentForm, paymentFormErrorMessage } from "@/features/use-chekout-payment-info/model/payment.form.ts";

export const clearPaymentForm = () => {
    paymentForm.value.cardName = '';
    paymentForm.value.cardNumber = '';
    paymentForm.value.expiryDate = '';
    paymentForm.value.cardCvv = '';
    paymentForm.value.paymentMethod = '';

    paymentFormErrorMessage.value.cardNumber = '';
    paymentFormErrorMessage.value.expiryDate = '';
    paymentFormErrorMessage.value.cardCvv = '';
    paymentFormErrorMessage.value.paymentMethod = '';
};
