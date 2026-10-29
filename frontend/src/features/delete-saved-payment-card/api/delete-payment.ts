import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeletePayment = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: deletePaymentCard,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["deletePaymentCard"],
        mutationFn: async (id: string) => {
            return await handler(`/payment/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["userPaymentCards"] });
        },

        onError: (err) => {
            throw new Error(`Ошибка при удалении способа оплаты`, err);
        },
    });

    return {
        deletePaymentCard,
        isPending,
        isError,
    };
};
