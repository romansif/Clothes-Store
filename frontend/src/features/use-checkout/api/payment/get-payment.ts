import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { loading } = useBaseModals();
const { userPayments, userPayment } = checkoutStore();

export const useGetPayment = () => {
    const getPayments = async () => {
        loading.value = true;

        try{
            const res = await handler(`/payment/${userData.id}`, {
                method: "GET",
            });
            console.log(res);
            userPayments.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user res:`, err);
        }
    };

    const getPayment = async () => {
        loading.value = true;

        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
            console.log(res);
            userPayment.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user payment:`, err);
        }
    };

    return {
        getPayment,
        getPayments,
    }
}