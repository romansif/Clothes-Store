import { handler } from "@/shared/api/http.ts";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

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