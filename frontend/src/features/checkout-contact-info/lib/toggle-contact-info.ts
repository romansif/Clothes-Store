import { isSavedAddress } from "@/entities/checkout-info-item/model/information.refs";

export const toggleInformation = () => {
    const toggleShowContact = () => {
        isSavedAddress.value = !isSavedAddress.value;
    };

    return {
        toggleShowContact,
    };
};
