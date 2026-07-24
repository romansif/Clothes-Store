import { handler } from "../../../shared/api/http.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";

const { userAddresses, userAddress, userPayments, userPayment } = usersStore()

export const useGetProfile = () => {
    const getAddresses = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const addresses = await handler(`/checkout/address/${userId}`, {
                method: "GET",
            })
            userAddresses.value = addresses
        }catch(err){
            console.error(err)
        }
    };

    const getAddress = async () => {
        const addressId = localStorage.getItem("addressId");
        try{
            const addresses = await handler(`/checkout/address/item/${addressId}`, {
                method: "GET",
            })
            userAddress.value = addresses
        }catch(err){
            console.error(err)
        }
    };

    const getPayments = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const payments = await handler(`/checkout/payment/${userId}`, {
                method: "GET",
            })
            userPayments.value = payments
        }catch(err){
            console.error(err)
        }
    };

    const getPayment = async () => {
        const paymentId = localStorage.getItem("paymentId");
        try{
            const payments = await handler(`/checkout/payment/item/${paymentId}`, {
                method: "GET",
            })
            userPayment.value = payments
        }catch(err){
            console.error(err)
        }
    }

    return{
        getAddresses,
        getAddress,

        getPayments,
        getPayment
    }
}