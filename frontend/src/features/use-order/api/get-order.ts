import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { orderStore } from "@/features/use-order/model/order.store";
import { userStore } from "@/features/use-profile/model/user.store";

const { orders } = orderStore();
const { userData } = userStore();
const { loading } = useBaseModals();

export const useGetOrder = () => {
    const getOrders = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            orders.value = await handler(`/orders/${userData.value.id}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getFilteredOrders = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            orders.value = await handler(`/orders/active/${userData.value.id}`, {
                method: 'GET',
            });
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