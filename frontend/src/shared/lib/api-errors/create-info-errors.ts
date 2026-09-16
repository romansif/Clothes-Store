import {ApiError} from "@/shared/api/http.ts";
import { applyErrors } from "@/shared/lib/error-helper/errors-helper.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";
import { informationFormErrorMessages } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { addContactInfoSchema } from "@/features/use-checkout-contact-info/model/address.schemas.ts";

export const createInformationApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        addContactInfoSchema,
        errors,
        informationFormErrors.value,
        informationFormErrorMessages.value
    )
};