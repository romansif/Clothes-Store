import { computed } from "vue";
import { paymentMethods } from "@/entities/checkout-payment/model/payment-methods";
import type { PaymentMethod } from "@/entities/checkout-payment/model/payment-method.types";

export const usePaymentMethod = (props: PaymentMethod) => {
    const methods = computed(() => {
        return paymentMethods[props];
    });

    return {
        methods,
    }
}