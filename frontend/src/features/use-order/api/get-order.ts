import { handler } from "@/shared/api/http.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { orders } = orderStore();
const { userData } = userStore();

export const useGetOrder = () => {
    const getOrders = async () => {
        try{
            const res = await handler(`/orders/${userData.id}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }
    };

    const getFilteredOrders = async () => {
        try{
            const res = await handler(`/orders/active/${userData.id}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }
    };

    return {
        getOrders,
        getFilteredOrders,
    }
}