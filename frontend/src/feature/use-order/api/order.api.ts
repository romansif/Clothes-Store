import { handler } from "@/shared/api/http.ts";
import { useCheckout } from "@/feature/use-checkout/model/use-checkout.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { totalPrice } = useCheckout();
const { shipping } = checkoutForm();
const { orders, items } = orderStore();
const { replaceOrderErrors } = useFormsErrors();
const { openNotify, cancelChoice, orderId, loading } = useBaseModals();

export const orderApi = () => {
    const getOrders = async () => {
        loading.value = true;

        try{
            const res = await handler(`/orders/${userData.id}`, {
                method: 'GET',
            })
            console.log(res);
            orders.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }
    };

    const getFilteredOrders = async () => {
        loading.value = true;

        try{
            const res = await handler(`/orders/active/${userData.id}`, {
                method: 'GET',
            })
            console.log(res);
            orders.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }
    };

    const addOrder = async () => {
        try{
            await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shipping.value.delivery,
                    status: 'Convene'
                })
            })
        }catch(err){
            console.error(`Failed to create the order:`, err);
        }
    };

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
                'Thank you for providing us with this information, it helps us improve our service.', '')

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

    return{
        getOrders,
        getFilteredOrders,

        addOrder,

        replaceOrder,

        deleteOrderProducts,
    }
}

