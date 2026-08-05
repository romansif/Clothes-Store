import { handler } from "@/shared/api/http";
import { useCart } from "@/feature/products/composables/use.cart";
import { productsStore } from "@/shared/composables/stores/products.store";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";

const { totalPrice } = checkout();
const { orders, items } = productsStore();
const { updateCheckedQuantity } = useCart();
const { shipping } = checkoutForms();
const { cancelChoice, orderId, openNotify } = useBaseModals();

export const useOrders = () => {
    const getOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/orders/${userId}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }
    };

    const getFilteredOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/orders/active/${userId}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }
    };

    const addOrder = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const newOrder = await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shipping.value.delivery,
                    dateCreatedOrder: dateCreated,
                    timeCreatedOrder: time,
                    status: 'Convene'
                })
            })
            orders.value = newOrder;

            await updateCheckedQuantity();
        }catch(err){
            console.error(`Failed to create the order:`, err);
        }
    };

    const updateOrderStatus = async () => {
        try{
            if(!cancelChoice.value){
                return;
            }
            await handler(`/orders/${orderId.value}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: 'Cancelled'
                })
            });
            await openNotify('You have successfully cancelled the order.',
                'Thank you for providing us with this information, it helps us improve our service.', '')

            await getOrders();
        }catch(err){
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
        updateOrderStatus,
        deleteOrderProducts,
    }
}

