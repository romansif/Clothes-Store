import { handler } from "@/shared/api/http.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { userAddresses, userAddress } = checkoutStore();

export const useGetAddress = () => {
    const getAddresses = async () => {
        try{
            const res = await handler(`/address/${userData.id}`, {
                method: "GET",
            });
            userAddresses.value = res;
        }catch(err){
            console.error(`Failed to get the user addresses:`, err);
        }
    };

    const getAddress = async () => {
        const addressId = localStorage.getItem("addressId");

        try{
            const res = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
            userAddress.value = res;
        }catch(err){
            console.error(`Failed to get the user address:`, err);
        }
    };

    return {
        getAddresses,
        getAddress,
    }
}