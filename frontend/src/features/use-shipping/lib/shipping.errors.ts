import {ref} from "vue";
import type { ShippingFormError } from "@/features/use-shipping/model/shipping.types.form.ts";

export const shippingFormError = ref<ShippingFormError>({
    deliveryError: false
})
