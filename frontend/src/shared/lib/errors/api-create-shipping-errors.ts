import {ApiError} from "@/shared/api/http.ts";
import {shippingFormError} from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";
import {shippingFormErrorMessage} from "@/features/use-checkout-shipping-info/model/shipping.form.ts";

export const createSippingErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    shippingFormError.value.delivery = !!errors.delivery;

    shippingFormErrorMessage.value.delivery = errors.delivery || '';
};
