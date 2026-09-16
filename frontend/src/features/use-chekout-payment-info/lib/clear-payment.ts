import {
    paymentForm, paymentFormErrorMessage, paymentFormErrors
} from "@/features/use-chekout-payment-info/model/payment.form.ts";

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

    paymentFormErrors.value.cardNumber = false;
    paymentFormErrors.value.expiryDate = false;
    paymentFormErrors.value.cardCvv = false;
    paymentFormErrors.value.paymentMethod = false;
};
