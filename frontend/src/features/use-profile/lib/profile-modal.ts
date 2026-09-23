import { ref } from "vue";
import { clearUsersForms } from "@/features/use-profile-form/lib/clear-user-update.ts";

const avatarModal = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const currentOrder= ref<boolean>(false);
const orderHistory = ref<boolean>(false);
const savedAddresses = ref<boolean>(false);
const savedPaymentCard = ref<boolean>(false);
const confidentialityData = ref<boolean>(false);

const { clearUpdateUserForm } = clearUsersForms();

export const useProfileModals = () => {
    const toggleAvatar = () => {
        avatarModal.value = !avatarModal.value;
    };

    const openSelectAvatar = () => {
        fileInput.value?.click()
    };

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
        toggleAvatar,
        openSelectAvatar,

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

        avatarModal,
        fileInput,
    }
}