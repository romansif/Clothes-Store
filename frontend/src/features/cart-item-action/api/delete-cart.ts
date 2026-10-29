import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteCartItem,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["deleteCartItem"],
        mutationFn: async (id: string) => {
            return await handler(`/cart/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: (err) => {
            throw new Error("Ошибка при удалении товара из корзины:", err);
        },
    });

    return {
        deleteCartItem,
        isPending,
        isError,
    };
};
