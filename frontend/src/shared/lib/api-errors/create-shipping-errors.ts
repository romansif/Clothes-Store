import {ApiError} from "@/shared/api/http.ts";
import {applyErrors} from "@/shared/lib/error-helper/error-helper.ts";
import {shippingFormError} from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";
import {shippingFormErrorMessage} from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import {addShippingSchema} from "@/features/use-checkout-shipping-info/model/shipping.schemas.ts";

export const createSippingApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        addShippingSchema,
        errors,
        shippingFormError.value,
        shippingFormErrorMessage.value
    )
};
