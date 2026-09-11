import { shippingForm, shippingFormErrorMessage } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.deliveryMessage = '';
    shippingFormError.value.deliveryError = false;
};

