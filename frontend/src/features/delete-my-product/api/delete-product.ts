import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { handler } from "@/shared/api/http";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteProduct,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: async (id: string) => {
            return await handler(`/products/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["filteredProducts"] }),
                queryClient.invalidateQueries({ queryKey: ["myProducts"] }),
                queryClient.invalidateQueries({ queryKey: ["yearProducts"] }),
                queryClient.invalidateQueries({ queryKey: ["weekProducts"] }),
                queryClient.invalidateQueries({ queryKey: ["seasonCatalog"] }),
            ]);
        },

        onError: (err) => {
            throw new Error(`Ошибка при удалении товара`, err);
        },
    });

    return {
        deleteProduct,
        isPending,
        isError,
    };
};
