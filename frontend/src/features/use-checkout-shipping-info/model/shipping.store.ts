import {ref} from "vue";
import { type UserShipping } from "@/features/use-checkout-shipping-info/model/shipping.types.ts";

const userShipping = ref<UserShipping[]>([])

export const shippingStore = () => {
    return {
        userShipping
    }
}