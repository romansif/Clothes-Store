import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteProduct, isPending } = useMutation({mutationKey: ['deleteProduct'],
        mutationFn: async (id: string) => {
            return await handler(`/products/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['filteredProducts'] }),
                queryClient.invalidateQueries({ queryKey: ['yearProducts'] }),
                queryClient.invalidateQueries({ queryKey: ['weekProducts'] }),
                queryClient.invalidateQueries({ queryKey: ['seasonCatalog'] }),
            ])
        },

        onError: (err) => {
            console.error(`Ошибка при удалении товара`, err);
        }
    })

    return {
        deleteProduct,
        isPending
    }
};

