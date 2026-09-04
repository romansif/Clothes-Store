import { handler } from "@/shared/api/http.ts";
import { useGetPayment } from "@/features/use-checkout/api/payment/get-payment.ts";

const { getPayments } = useGetPayment();

export const useDeletePayment = () => {
    const deletePayment = async (id: string) => {
        try{
            await handler(`/payment/${id}`, {
                method: "DELETE",
            });
            await getPayments();
        }catch(err){
            console.error(`Failed to delete the user payment:`, err);
        }
    };

    return {
        deletePayment,
    }
}