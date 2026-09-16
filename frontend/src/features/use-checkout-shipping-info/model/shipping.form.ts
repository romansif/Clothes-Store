import {ref} from "vue";
import type {
    ShippingForm,
    ShippingFormError,
    ShippingFormErrorMessage
} from "@/features/use-checkout-shipping-info/model/shipping.types.form.ts";

export const shippingForm = ref<ShippingForm>({
    delivery: '',
});

export const shippingFormErrorMessage = ref<ShippingFormErrorMessage>({
    delivery: ''
});

export const shippingFormError = ref<ShippingFormError>({
    delivery: false
});
