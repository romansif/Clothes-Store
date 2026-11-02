import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getShipping } from "@/features/checkout-shipping-info/api/get-shipping";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";

export const useSavedShippingData = () => {
    const {
        data: shipping,
        isLoading,
        isError,
    } = useQuery({
        queryKey: computed(() => ["shipping", checkoutSession.paymentId]),

        queryFn: () => {
            if (!checkoutSession.paymentId) {
                throw new Error("User is not authenticated");
            }

            return getShipping(checkoutSession.paymentId);
        },

        enabled: computed(() => Boolean(checkoutSession.paymentId)),
    });

    return {
        shipping,
        isLoading,
        isError,
    };
};
