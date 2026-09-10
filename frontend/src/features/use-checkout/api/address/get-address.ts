import { handler } from "@/shared/api/http.ts";
import { checkoutStore } from "@/features/use-checkout/model/checkout.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

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
            userAddresses.value = res;
        }catch(err){
            console.error(`Failed to get the user addresses:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getAddress = async () => {
        loading.value = true;

        const addressId = localStorage.getItem("addressId");
        try{
            const res = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
            userAddress.value = res;
        }catch(err){
            console.error(`Failed to get the user address:`, err);
        }finally {
            loading.value = false;
        }
    };

    return {
        getAddresses,
        getAddress,
    }
}