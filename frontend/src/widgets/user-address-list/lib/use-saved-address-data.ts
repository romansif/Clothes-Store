import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGetAddress } from "@/widgets/user-address-list/api/get-address";

const { getAddresses, getAddress } = useGetAddress()

export const useSavedAddressesData = () => {
    const userId = localStorage.getItem("userId");

    const { data: userAddresses } = useQuery({
        queryKey: computed(() => ['userAddresses', userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error('Пользователь не зарегистрирован');
            }

            return getAddresses(userId)
        },

        enabled: computed(() => Boolean(userId)),
    })

    return {
        userAddresses: computed(() => userAddresses.value ?? []),
    };
}

export const useSavedAddressData = () => {
    const addressId = localStorage.getItem("addressId");

    const { data: userAddress } = useQuery({
        queryKey: computed(() => ['userAddress', addressId]),

        queryFn: () => {
            if (!addressId) {
                throw new Error('User is not authenticated');
            }

            return getAddress(addressId)
        },

        enabled: computed(() => Boolean(addressId)),
    })

    return {
        userAddress
    };
}
