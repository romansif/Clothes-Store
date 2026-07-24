import router from "../../../app/router";
import { useGetProfile } from "./getProfile.ts";
import { handler } from "../../../shared/api/http.ts";

const { getAddresses, getPayments } = useGetProfile();

export const useDeleteProfile = () => {
    const deleteAddress = async (id: string) => {
        try{
            await handler(`/checkout/address/${id}`, {
                method: "DELETE",
            })

            await getAddresses()
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    }


    const deletePayment = async (id: string) => {
        try{
            await handler(`/checkout/payment/${id}`, {
                method: "DELETE",
            })

            await getPayments()
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    }


    const deleteAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            await handler(`/users/${userId}`, {
                method: "DELETE",
            });

            localStorage.clear()

            await router.push({ name: '/auth/LoginPage' });
        }catch(err){
            console.log('Не удалось удалить аккаунт', err);
        }
    };

    return{
        deleteAddress,
        deletePayment,
        deleteAccount,
    }
}