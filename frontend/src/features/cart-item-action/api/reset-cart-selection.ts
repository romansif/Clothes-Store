import { handler } from "@/shared/api/http";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import { orderStore } from "@/shared/model/order.store";

const { orderItems } = orderStore()
export const useResetCartSelection = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: resetSelection, isPending } = useMutation({mutationKey: ['resetSelection'],
        mutationFn: async () => {
            return await handler('/reset-selection', {
                method: 'POST',
            })
        },

        onSuccess: async () => {
            orderItems.value = []
            localStorage.removeItem("orderItems");
            await queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    })

    return {
        resetSelection,
        isPending
    }
}