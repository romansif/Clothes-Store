import { shippingForm, shippingFormErrorMessage } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/model/shipping.errors.ts";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.delivery = '';
    shippingFormError.value.delivery = false;
};

