import { handler } from "@/shared/api/http.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { userPayments, userPayment } = checkoutStore();

export const useGetPayment = () => {
    const getPayments = async () => {
        try{
            const res = await handler(`/payment/${userData.id}`, {
                method: "GET",
            });
            userPayments.value = res;
        }catch(err){
            console.error(`Failed to get the user res:`, err);
        }
    };

    const getPayment = async () => {
        const paymentId = localStorage.getItem("paymentId");

        try{
            const res = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
            userPayment.value = res;
        }catch(err){
            console.error(`Failed to get the user payment:`, err);
        }
    };

    return {
        getPayment,
        getPayments,
    }
}