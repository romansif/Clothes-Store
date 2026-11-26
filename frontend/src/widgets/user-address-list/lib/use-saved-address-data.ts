import { computed, toValue } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { useGetAddress } from "@/widgets/user-address-list/api/get-address";
import { checkoutSession } from "@/entities/checkout-session";
import { address_id } from "@/features/edit-saved-address"

const { getAddresses, getAddress } = useGetAddress();

export const useSavedAddressesData = () => {
  const userId = localStorage.getItem("userId");

  const {
    data: userAddresses,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: computed(() => ["userAddresses", userId]),

    queryFn: () => {
      if (!userId) {
        throw new Error("Пользователь не зарегистрирован");
      }

      return getAddresses(userId);
    },

    enabled: computed(() => Boolean(userId)),
  });

  return {
    userAddresses: computed(() => userAddresses.value ?? []),
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export const useSavedAddressData = () => {
  const id = computed(() => toValue(address_id) || checkoutSession.addressId || null);

  const {
    data: userAddress,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: computed(() => ["userAddress", id.value]),

    queryFn: () => {
      if (!checkoutSession.addressId) {
        throw new Error("User is not authenticated");
      }else if (!id.value) {
        throw new Error("Address id is required");
      }

      return getAddress(id.value);
    },

    enabled: computed(() => Boolean(id.value)),
  });

  return {
    userAddress,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
