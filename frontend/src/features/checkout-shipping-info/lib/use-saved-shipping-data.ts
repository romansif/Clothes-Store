import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getShipping } from "@/features/checkout-shipping-info/api/get-shipping";

export const useSavedShippingData = () => {
    const paymentId = localStorage.getItem("paymentId");

    const {
        data: shipping,
        isLoading,
        isError,
    } = useQuery({
        queryKey: computed(() => ["shipping", paymentId]),

        queryFn: () => {
            if (!paymentId) {
                throw new Error("User is not authenticated");
            }

            return getShipping(paymentId);
        },

        enabled: computed(() => Boolean(paymentId)),
    });

    return {
        shipping,
        isLoading,
        isError,
    };
};
