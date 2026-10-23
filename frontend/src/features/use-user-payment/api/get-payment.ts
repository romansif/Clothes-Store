import { handler } from "@/shared/api/http";
import { paymentStore } from "@/shared/model/payment.store";
import { userStore } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { userData } = userStore();
const { loading } = useBaseModals();
const { userPayments, userPayment } = paymentStore();

export const useGetPayment = () => {
    const getPayments = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            userPayments.value = await handler(`/payment/${userData.value.id}`, {
                method: "GET",
            });
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

            userPayment.value = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
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