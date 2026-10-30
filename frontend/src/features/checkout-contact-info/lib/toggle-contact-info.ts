import { ref } from "vue";

import { isSavedAddress } from "@/entities/checkout-info-item/model/information.refs";

const informationId = ref<string>("");

export const toggleInformation = () => {
    const toggleShowContact = () => {
        isSavedAddress.value = !isSavedAddress.value;
    };

    return {
        informationId,
        toggleShowContact,
    };
};
