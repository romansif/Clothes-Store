import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { handler } from "@/shared/api/http";

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteAddressItem,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["deleteAddressItem"],
        mutationFn: async (id: string) => {
            await handler(`/address/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
        },

        onError: (err) => {
            throw new Error(`Ошибка при удалении адреса доставки`, err);
        },
    });

    return {
        deleteAddressItem,
        isPending,
        isError,
    };
};
