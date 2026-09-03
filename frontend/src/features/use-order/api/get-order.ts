import { handler } from "@/shared/api/http.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import {userStore} from "@/entities/profile/model/user.store.ts";

const { orders } = orderStore();
const { userData } = userStore();
const { loading } = useBaseModals();

export const useGetOrder = () => {
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

    return {
        getOrders,
        getFilteredOrders,
    }
}