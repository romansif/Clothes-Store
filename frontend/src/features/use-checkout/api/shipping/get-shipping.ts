import { handler } from "@/shared/api/http.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";

const { userShipping } = checkoutStore();

export const useGetShipping = () => {
    const getShipping = async () => {
        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/shipping/${paymentId}`, {
                method: "GET",
            });
            console.log(res);
            userShipping.value = res;
        }catch(err){
            console.error(`Failed to get the shipping:`, err);
        }
    };

    return {
        getShipping
    }
}