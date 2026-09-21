import { ref } from "vue";
import { type UserShipping } from "@/entities/checkout-shipping/model/shipping.types.ts";

const userShipping = ref<UserShipping[]>([])

export const shippingStore = () => {
    return {
        userShipping
    }
}