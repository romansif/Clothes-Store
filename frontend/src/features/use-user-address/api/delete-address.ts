import { handler } from "@/shared/api/http";
import { useGetAddress } from "@/features/use-user-address/api/get-address";

const { getAddresses } = useGetAddress();

export const useDeleteAddress = () => {
    const deleteAddress = async (id: string) => {
        try{
            await handler(`/address/${id}`, {
                method: "DELETE",
            });
            await getAddresses();
        }catch(err){
            console.error(`Failed to delete the user address:`, err);
        }
    };

    return {
        deleteAddress,
    }
}