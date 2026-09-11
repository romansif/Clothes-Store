import { paymentForm, paymentFormErrorMessage } from "@/features/use-payment/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-payment/lib/payment.errors.ts";

export const clearPaymentForm = () => {
    paymentForm.value.cardName = '';
    paymentForm.value.cardNumber = '';
    paymentForm.value.expiryDate = '';
    paymentForm.value.cardCvv = '';
    paymentForm.value.paymentMethod = '';

    paymentFormErrorMessage.value.cardNumberMessage = '';
    paymentFormErrorMessage.value.expiryDateMessage = '';
    paymentFormErrorMessage.value.cardCvvMessage = '';
    paymentFormErrorMessage.value.paymentMethodMessage = '';

    paymentFormErrors.value.cardNumberError = false;
    paymentFormErrors.value.expiryDateError = false;
    paymentFormErrors.value.cardCvvError = false;
    paymentFormErrors.value.paymentMethodError = false;
};
