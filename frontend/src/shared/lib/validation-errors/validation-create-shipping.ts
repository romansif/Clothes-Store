import type { z, ZodError } from "zod";
import type {addShippingSchema} from "@/features/use-checkout-shipping-info/model/shipping.schemas.ts";
import {shippingFormError} from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";
import {shippingFormErrorMessage} from "@/features/use-checkout-shipping-info/model/shipping.form.ts";

type CreateShippingData = z.infer<typeof addShippingSchema>;

export const createShippingValidationErrors = (err: ZodError<CreateShippingData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof shippingFormError.value;

        shippingFormError.value[field] = true;
        shippingFormErrorMessage.value[field] = issue.message;
    })
};