import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { loading } = useBaseModals();
const { userAddresses, userAddress } = checkoutStore();

export const useGetAddress = () => {
    const getAddresses = async () => {
        loading.value = true;

        try{
            const res = await handler(`/address/${userData.id}`, {
                method: "GET",
            });
            console.log(res);
            userAddresses.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user addresses:`, err);
        }
    };

    const getAddress = async () => {
        loading.value = true;

        const addressId = localStorage.getItem("addressId");
        try{
            const res = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
            console.log(res);
            userAddress.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user address:`, err);
        }
    };

    return {
        getAddresses,
        getAddress,
    }
}