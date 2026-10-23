import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping/model/shipping-form";

export const clearShippingForm = () => {
    shippingForm.value.delivery = '';
    shippingFormErrorMessage.value.delivery = '';
};

