import { handler } from "@/shared/api/http.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

const { userData } = userStore();
const { loading } = useBaseModals();
const { userPayments, userPayment } = paymentStore();

export const useGetPayment = () => {
    const getPayments = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            const res = await handler(`/payment/${userData.value.id}`, {
                method: "GET",
            });
            userPayments.value = res;
        }catch(err){
            console.error(`Failed to get the user res:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getPayment = async () => {
        loading.value = true;

        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
            userPayment.value = res;
        }catch(err){
            console.error(`Failed to get the user payment:`, err);
        }finally {
            loading.value = false;
        }
    };

    return {
        getPayment,
        getPayments,
    }
}