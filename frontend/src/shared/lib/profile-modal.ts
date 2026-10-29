import { ref } from "vue";
import { clearUsersForms } from "@/features/change-user-data-form/lib/clear-user-update";

const currentOrder = ref<boolean>(false);
const orderHistory = ref<boolean>(false);
const savedAddresses = ref<boolean>(false);
const savedPaymentCard = ref<boolean>(false);
const confidentialityData = ref<boolean>(false);

const { clearUpdateUserForm } = clearUsersForms();

export const useProfileModals = () => {
    const toggleOrderHistory = () => {
        orderHistory.value = !orderHistory.value;
    };

    const toggleCurrentOrder = () => {
        currentOrder.value = !currentOrder.value;
    };

    const toggleConfidentialityData = () => {
        confidentialityData.value = !confidentialityData.value;
        clearUpdateUserForm();
    };

    const toggleSavedAddresses = () => {
        savedAddresses.value = !savedAddresses.value;
    };

    const toggleSavedPaymentCard = () => {
        savedPaymentCard.value = !savedPaymentCard.value;
    };

    return {
        toggleOrderHistory,
        toggleCurrentOrder,
        toggleConfidentialityData,
        toggleSavedAddresses,
        toggleSavedPaymentCard,

        orderHistory,
        currentOrder,
        confidentialityData,
        savedAddresses,
        savedPaymentCard,
    };
};
