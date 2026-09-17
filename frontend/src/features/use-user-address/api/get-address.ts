import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

const { userData } = userStore();
const { loading } = useBaseModals();
const { userAddresses, userAddress } = informationContactStore();

export const useGetAddress = () => {
    const getAddresses = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            userAddresses.value = await handler(`/address/${userData.value.id}`, {
                method: "GET",
            });
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
            userAddress.value = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
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