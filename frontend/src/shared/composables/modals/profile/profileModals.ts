import { ref } from "vue";

const avatarModal = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const orderHistory = ref<boolean>(false);
const currentOrder= ref<boolean>(false);
const confidentialityData = ref<boolean>(false);
const addressesAndCards = ref<boolean>(false);

export const useProfileModals = () => {
    const toggleAvatar = () => {
        avatarModal.value = !avatarModal.value;
    }

    const openSelectAvatar = () => {
        fileInput.value?.click()
    }

    const toggleOrderHistory = () => {
        orderHistory.value = !orderHistory.value;
    }

    const toggleCurrentOrder = () => {
        currentOrder.value = !currentOrder.value;
    }

    const toggleConfidentialityData = () => {
        confidentialityData.value = !confidentialityData.value;
    }

    const toggleAddressesAndCards = () => {
        addressesAndCards.value = !addressesAndCards.value;
    }

    return {
        toggleAvatar,
        openSelectAvatar,

        toggleOrderHistory,
        toggleCurrentOrder,
        toggleConfidentialityData,
        toggleAddressesAndCards,

        orderHistory,
        currentOrder,
        confidentialityData,
        addressesAndCards,

        avatarModal,
        fileInput
    }
}