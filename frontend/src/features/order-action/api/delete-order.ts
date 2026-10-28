import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { orderStore } from "@/shared/model/order.store";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { clearReplaceForm } from "@/features/order-modals/lib/clear-order-form";
import { toggleReplaceChoice } from "@/entities/order-action/lib/order-modal";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order-forms";
import { replaceOrderSchema } from "@/entities/order/model/replace-order-schemas";

const { orderId } = orderStore();
const { openNotify } = useBaseModals();

export const useReplaceOrder = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: replaceOrder, isPending } = useMutation({mutationKey: ['replaceOrder'],
        mutationFn: async () => {
            const result = replaceOrderSchema.safeParse(cancelChoiceForm.value)
            if(!result.success){
                applyZodErrors(
                    result.error,
                    cancelChoiceMessage
                );
                return
            }

            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            return await handler(`/orders/${orderId.value}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: 'Cancelled',
                    cause_replace: cancelChoiceForm.value.cancelChoice,
                    cancelled_at: date,
                    date_cancelled_at: dateCreated,
                    time_cancelled_at: time,
                })
            });
        },

        onSuccess: async () => {
            clearReplaceForm()

            await queryClient.invalidateQueries({queryKey: ['orders']})

            await openNotify('You have successfully cancelled the order.',
                'Thank you for providing us with this information, it helps us improve our service.')

            toggleReplaceChoice('')
        },

        onError: (err) => {
            applyErrors(err, cancelChoiceMessage);
            console.error(`Ошибка при отмене заказа`, err);
        }
    })

    return{
        replaceOrder,
        isPending
    }
}

export const useDeleteOrder = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteOrder, isPending } = useMutation({mutationKey: ['deleteOrder'],
        mutationFn: async (id: string) => {
            return await handler(`/orders/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['orders']})
        },

        onError: (err) => {
            console.error(`Failed to delete the order:`, err);
        }
    })

    return {
        deleteOrder,
        isPending
    }
}