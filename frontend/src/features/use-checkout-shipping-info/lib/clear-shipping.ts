import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.delivery = '';
};

