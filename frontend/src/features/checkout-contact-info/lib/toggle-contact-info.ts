import { isSavedAddress } from "@/entities/checkout-info-item";

export const toggleInformation = () => {
  const toggleShowContact = () => {
    isSavedAddress.value = !isSavedAddress.value;
  };

  return {
    toggleShowContact,
  };
};
