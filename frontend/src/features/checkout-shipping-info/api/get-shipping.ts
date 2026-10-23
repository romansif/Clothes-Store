import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { shippingStore } from "@/features/checkout-shipping-info/model/shipping.store";

const { loading } = useBaseModals();
const { userShipping } = shippingStore();

export const getShipping = async () => {
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

