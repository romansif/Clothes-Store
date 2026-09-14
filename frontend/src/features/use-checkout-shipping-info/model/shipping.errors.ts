import {ref} from "vue";
import type { ShippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.types.form.ts";

export const shippingFormError = ref<ShippingFormError>({
    delivery: false
})
