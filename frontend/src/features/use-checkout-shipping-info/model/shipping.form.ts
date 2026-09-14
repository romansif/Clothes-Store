import {ref} from "vue";
import type { ShippingForm, ShippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.types.form.ts";

export const shippingForm = ref<ShippingForm>({
    delivery: '',
})

export const shippingFormErrorMessage = ref<ShippingFormErrorMessage>({
    delivery: ''
})

