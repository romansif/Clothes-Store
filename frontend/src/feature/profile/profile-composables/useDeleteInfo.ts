import { handler } from "@/shared//api/http.ts";
import { useGetProfile } from "./getProfileInfo.ts";

const { getAddresses, getPayments } = useGetProfile();

export const useDeleteCheckout = () => {
    const deleteAddress = async (id: string) => {
        try{
            await handler(`/checkout/address/${id}`, {
                method: "DELETE",
            });

            await getAddresses();
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    };

    const deletePayment = async (id: string) => {
        try{
            await handler(`/checkout/payment/${id}`, {
                method: "DELETE",
            });

            await getPayments();
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    };

    return{
        deleteAddress,
        deletePayment,
    }
}