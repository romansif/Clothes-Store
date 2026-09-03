import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import {useGetOrder} from "@/features/use-order/api/get-order.ts";

const { getOrders } = useGetOrder();
const { replaceOrderErrors } = useFormsErrors();
const { openNotify, cancelChoice, orderId } = useBaseModals();

export const useDeleteOrder = () => {
    const replaceOrder = async () => {
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
                    cause_replace: cancelChoice.value,
                    cancelled_at: date,
                    date_cancelled_at: dateCreated,
                    time_cancelled_at: time,
                })
            });
            await openNotify('You have successfully cancelled the order.',
                'Thank you for providing us with this information, it helps us improve our service.', 'profile')

            await getOrders();
        }catch(err){
            replaceOrderErrors(err);
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