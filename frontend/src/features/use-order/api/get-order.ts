import { handler } from "@/shared/api/http.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

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
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getFilteredOrders = async () => {
        loading.value = true;
        try{
            const res = await handler(`/orders/active/${userData.id}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }finally {
            loading.value = false;
        }
    };

    return {
        getOrders,
        getFilteredOrders,
    }
}