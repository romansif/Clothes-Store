import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteAddressItem, isPending } = useMutation({mutationKey: ['deleteAddressItem'],
        mutationFn: async (id: string) => {
            await handler(`/address/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['userAddresses']})
        },

        onError: (err) => {
            console.error(`Ошибка при удалении адреса доставки`, err);
        }
    })

    return {
        deleteAddressItem,
        isPending
    }
}