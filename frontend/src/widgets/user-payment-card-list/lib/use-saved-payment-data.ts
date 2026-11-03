import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { useGetPayment } from "@/widgets/user-payment-card-list/api/get-payment";
import { checkoutSession } from "@/entities/checkout-session";

const { getPayments, getPayment } = useGetPayment();

export const useSavedPaymentsData = () => {
  const userId = localStorage.getItem("userId");

  const {
    data: userPaymentCards,
    isLoading,
    isFetching,
    isError,
    refetch,
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
    userPaymentCards: computed(() => (userPaymentCards.value ?? []).filter((p) => p.paymentMethod === "card")),
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export const useSavedPaymentData = () => {
  const {
    data: userPaymentCard,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: computed(() => ["userPaymentCard", checkoutSession.paymentId]),

    queryFn: () => {
      if (!checkoutSession.paymentId) {
        throw new Error("User is not authenticated");
      }

      return getPayment(checkoutSession.paymentId);
    },

    enabled: computed(() => Boolean(checkoutSession.paymentId)),
  });

  return {
    userPaymentCard,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
