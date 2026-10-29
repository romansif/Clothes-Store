import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteFavoriteProduct = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteFavoriteItem, isPending, isError } = useMutation({mutationKey: ['deleteFavoriteItem'],
        mutationFn: async (id: string | undefined) => {
            return await handler(`/favorites/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['favorite']})
        },

        onError: (err) => {
            console.error(`Ошибка при удалении товара из избранного`, err);
        }
    })

    return {
        deleteFavoriteItem,
        isPending,
        isError
    }
};