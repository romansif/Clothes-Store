import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useGetOrder } from "@/features/use-order/api/get-order.ts";
import { applyZodErrors, applyErrors} from "@/shared/lib/helper/errors-helper.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { clearReplaceForm } from "@/features/use-order/lib/clear-order-form.ts";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order.forms.ts";
import { replaceOrderSchema } from "@/entities/order/model/replace.order.schemas.ts";

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
                'Thank you for providing us with this information, it helps us improve our service.', 'profile')

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