import { handler } from "@/shared/api/http";
import { productsStore } from "@/shared/composables/stores/products.store";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors.ts";

const { totalPrice } = checkout();
const { shipping } = checkoutForms();
const { orders, items } = productsStore();
const { replaceOrderErrors } = useFormsErrors();
const { openNotify, cancelChoice, orderId, loading } = useBaseModals();

export const useOrders = () => {
    const getOrders = async () => {
        loading.value = true;

        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/orders/${userId}`, {
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

        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/orders/active/${userId}`, {
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
        const userId = localStorage.getItem("userId");
        try{
            await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
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

