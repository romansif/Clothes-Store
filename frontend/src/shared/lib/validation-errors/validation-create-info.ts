import type { z, ZodError } from "zod";
import {addContactInfoSchema} from "@/features/use-checkout-contact-info/model/address.schemas.ts";
import {informationFormErrors} from "@/features/use-checkout-contact-info/model/address.errors.ts";
import {informationFormErrorMessages} from "@/features/use-checkout-contact-info/model/address.form.ts";

type CreateInfoData = z.infer<typeof addContactInfoSchema>;

export const createInfoValidationErrors = (err: ZodError<CreateInfoData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof informationFormErrors.value;

        informationFormErrors.value[field] = true;
        informationFormErrorMessages.value[field] = issue.message;
    })
}