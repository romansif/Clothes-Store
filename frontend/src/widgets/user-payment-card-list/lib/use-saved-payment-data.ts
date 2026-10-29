import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGetPayment } from "@/widgets/user-payment-card-list/api/get-payment";

const { getPayments, getPayment } = useGetPayment();

export const useSavedPaymentsData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: userPaymentCards,
        isLoading,
        isError,
    } = useQuery({
        queryKey: computed(() => ["userPaymentCards", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getPayments(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        userPaymentCards: computed(() => userPaymentCards.value ?? []),
        isLoading,
        isError,
    };
};

export const useSavedPaymentData = () => {
    const paymentId = localStorage.getItem("paymentId");

    const {
        data: userPaymentCard,
        isLoading,
        isError,
    } = useQuery({
        queryKey: computed(() => ["userPaymentCard", paymentId]),

        queryFn: () => {
            if (!paymentId) {
                throw new Error("User is not authenticated");
            }

            return getPayment(paymentId);
        },

        enabled: computed(() => Boolean(paymentId)),
    });

    return {
        userPaymentCard,
        isLoading,
        isError,
    };
};
