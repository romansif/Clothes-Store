import { handler } from "@/shared/api/http";
import type { UserContactInfo } from "@/entities/user-address";

export const useGetAddress = () => {
    const getAddresses = async (userId: string) => {
        return await handler<UserContactInfo[]>(`/address/${userId}`, {
            method: "GET",
        });
    };

    const getAddress = async (addressId: string) => {
        return await handler<UserContactInfo>(`/address/item/${addressId}`, {
            method: "GET",
        });
    };

    return {
        getAddresses,
        getAddress,
    };
};
