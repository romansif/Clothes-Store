import {ApiError} from "@/shared/api/http.ts";
import {paymentFormErrors} from "@/features/use-chekout-payment-info/model/payment.errors.ts";
import {paymentFormErrorMessage} from "@/features/use-chekout-payment-info/model/payment.form.ts";

export const createPaymentCardErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    paymentFormErrors.value.cardNumber = !!errors.cardNumber;
    paymentFormErrors.value.expiryDate = !!errors.expiryDate;
    paymentFormErrors.value.cardCvv = !!errors.cardCvv;

    paymentFormErrorMessage.value.cardNumber = errors.cardNumber || '';
    paymentFormErrorMessage.value.expiryDate = errors.expiryDate || '';
    paymentFormErrorMessage.value.cardCvv = errors.cardCvv || '';
};

export const createPaymentMethodError = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    paymentFormErrors.value.paymentMethod = !!errors.paymentMethod;

    paymentFormErrorMessage.value.paymentMethod = errors.paymentMethod || '';
};