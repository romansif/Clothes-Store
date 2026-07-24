import { ref } from "vue";

const avatarModal = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

export const useUserModals = () => {
    const toggleAvatar = () => {
        avatarModal.value = !avatarModal.value;
    }

    const openSelectAvatar = () => {
        fileInput.value?.click()
    }

    return {
        toggleAvatar,
        openSelectAvatar,
        avatarModal,
        fileInput
    }
}