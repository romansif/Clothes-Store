import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGetAddress } from "@/widgets/user-address-list/api/get-address";
import { checkoutSession } from "@/entities/checkout-session";

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
    const {
        data: userAddress,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: computed(() => ["userAddress", checkoutSession.addressId]),

        queryFn: () => {
            if (!checkoutSession.addressId) {
                throw new Error("User is not authenticated");
            }

            return getAddress(checkoutSession.addressId);
        },

        enabled: computed(() => Boolean(checkoutSession.addressId)),
    });

    return {
        userAddress,
        isLoading,
        isFetching,
        isError,
        refetch,
    };
};
