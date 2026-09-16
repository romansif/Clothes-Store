import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useGetOrder } from "@/features/use-order/api/get-order.ts";
import { replaceOrderApiErrors } from "@/shared/lib/api-errors/replace-order-errors.ts";
import { replaceOrderValidationErrors } from "@/shared/lib/validation-errors/validation-replace-order.ts";
import { cancelChoiceForm } from "@/features/use-order/model/order.store.ts";
import { replaceOrderSchema } from "@/features/use-order/model/replace.order.schemas.ts";

const { getOrders } = useGetOrder();
const { openNotify, orderId } = useBaseModals();

export const useDeleteOrder = () => {
    const replaceOrder = async () => {
        const result = replaceOrderSchema.safeParse(cancelChoiceForm.value)
        if(!result.success){
            replaceOrderValidationErrors(result.error);
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
            await openNotify('You have successfully cancelled the order.',
                'Thank you for providing us with this information, it helps us improve our service.', 'profile')

            await getOrders();
        }catch(err){
            replaceOrderApiErrors(err);
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