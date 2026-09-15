import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.delivery = '';
    shippingFormError.value.delivery = false;
};

