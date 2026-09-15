import {ApiError} from "@/shared/api/http.ts";
import { applyErrors } from "@/shared/lib/error-helper/error-helper.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/model/payment.errors.ts";
import { paymentFormErrorMessage } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { addPaymentSchema } from "@/features/use-chekout-payment-info/model/payment.schemas.ts";

export const createPaymentCardApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        addPaymentSchema,
        errors,
        paymentFormErrors.value,
        paymentFormErrorMessage.value
    )
};

export const createPaymentMethoApiError = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        addPaymentSchema,
        errors,
        paymentFormErrors.value,
        paymentFormErrorMessage.value
    )
};