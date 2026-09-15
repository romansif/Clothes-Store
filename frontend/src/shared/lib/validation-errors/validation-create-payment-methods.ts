import type { z, ZodError } from "zod";
import type {addPaymentSchema} from "@/features/use-chekout-payment-info/model/payment.schemas.ts";
import {paymentFormErrors} from "@/features/use-chekout-payment-info/model/payment.errors.ts";
import {paymentFormErrorMessage} from "@/features/use-chekout-payment-info/model/payment.form.ts";

type CreatePaymentData = z.infer<typeof addPaymentSchema>;

export const createPaymentValidationErrors = (err: ZodError<CreatePaymentData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof paymentFormErrors.value;

        paymentFormErrors.value[field] = true;
        paymentFormErrorMessage.value[field] = issue.message;
    })
}