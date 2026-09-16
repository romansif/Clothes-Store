import {
    shippingForm, shippingFormErrorMessage, shippingFormError
} from "@/features/use-checkout-shipping-info/model/shipping.form.ts";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.delivery = '';
    shippingFormError.value.delivery = false;
};

