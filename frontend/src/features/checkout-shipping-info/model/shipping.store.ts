import { ref } from "vue";
import type { UserShipping } from "@/entities/checkout-shipping";

const userShipping = ref<UserShipping[]>([])

export const shippingStore = () => {
    return {
        userShipping
    }
}