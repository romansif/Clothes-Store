import { handler } from "@/shared/api/http.ts";
import { checkoutStore } from "@/features/use-checkout/model/checkout.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

const { loading } = useBaseModals();
const { userShipping } = checkoutStore();

export const useGetShipping = () => {
    const getShipping = async () => {
        loading.value = true;

        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/shipping/${paymentId}`, {
                method: "GET",
            });
            userShipping.value = res;
        }catch(err){
            console.error(`Failed to get the shipping:`, err);
        }finally {
            loading.value = false;
        }
    };

    return {
        getShipping
    }
}