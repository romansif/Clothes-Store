import { handler } from "@/shared/api";
import type { UserContactInfo } from "@/shared/model";

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
