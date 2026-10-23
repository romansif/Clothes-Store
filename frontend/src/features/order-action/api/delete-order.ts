import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useGetOrder } from "@/features/order-modals/api/get-order";
import { applyZodErrors, applyErrors} from "@/shared/lib/errors-helper";
import { orderStore } from "@/shared/model/order.store";
import { clearReplaceForm } from "@/features/order-modals/lib/clear-order-form";
import { toggleReplaceChoice } from "@/entities/order-action/lib/order-modal";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order-forms";
import { replaceOrderSchema } from "@/entities/order/model/replace-order-schemas";

const { orderId } = orderStore();
const { getOrders } = useGetOrder();
const { openNotify } = useBaseModals();

export const useDeleteOrder = () => {
    const replaceOrder = async () => {
        const result = replaceOrderSchema.safeParse(cancelChoiceForm.value)
        if(!result.success){
            applyZodErrors(
                result.error,
                cancelChoiceMessage
            );
            return
        }

        try{
            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            await handler(`/orders/${orderId.value}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: 'Cancelled',
                    cause_replace: cancelChoiceForm.value.cancelChoice,
                    cancelled_at: date,
                    date_cancelled_at: dateCreated,
                    time_cancelled_at: time,
                })
            });

            clearReplaceForm()
            await openNotify('You have successfully cancelled the order.',
                'Thank you for providing us with this information, it helps us improve our service.')
            toggleReplaceChoice('')
            await getOrders();
        }catch(err){
            applyErrors(
                err,
                cancelChoiceMessage
            );
            console.error(`Failed to delete the order:`, err);
        }
    };

    const deleteOrderProducts = async (id: string) => {
        try{
            await handler(`/orders/${id}`, {
                method: "DELETE",
            });
            await getOrders();
        }catch(err){
            console.error(`Failed to delete the order:`, err);
        }
    };

    return {
        replaceOrder,
        deleteOrderProducts,
    }
}