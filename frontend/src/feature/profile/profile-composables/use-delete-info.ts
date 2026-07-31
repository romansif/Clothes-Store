import { handler } from "@/shared//api/http.ts";
import { useGetProfile } from "./get-profile-info.ts";

const { getAddresses, getPayments } = useGetProfile();

export const useDeleteCheckout = () => {
    const deleteAddress = async (id: string) => {
        try{
            await handler(`/checkout/address/${id}`, {
                method: "DELETE",
            });

            await getAddresses();
        }catch(err){
            console.error(`Failed to delete the user address:`, err);
        }
    };

    const deletePayment = async (id: string) => {
        try{
            await handler(`/checkout/payment/${id}`, {
                method: "DELETE",
            });

            await getPayments();
        }catch(err){
            console.error(`Failed to delete the user payment:`, err);
        }
    };

    return{
        deleteAddress,
        deletePayment,
    }
}