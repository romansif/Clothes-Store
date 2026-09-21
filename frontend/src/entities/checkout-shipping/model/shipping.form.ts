import {ref} from "vue";
import type {
    ShippingForm,
    ShippingFormErrorMessage
} from "@/entities/checkout-shipping/model/shipping.types.form.ts";

export const shippingForm = ref<ShippingForm>({
    delivery: '',
});

export const shippingFormErrorMessage = ref<ShippingFormErrorMessage>({
    delivery: ''
});

