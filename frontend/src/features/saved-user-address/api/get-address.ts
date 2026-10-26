import { handler } from "@/shared/api/http";
import { userData } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";
import { informationContactStore } from "@/shared/model/address.store";

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