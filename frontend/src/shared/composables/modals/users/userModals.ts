import { ref } from "vue";

const avatarModal = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

export const useUserModals = () => {
    const openAvatarModal = () => {
        avatarModal.value = true;
    }

    const closeAvatarModal = () => {
        avatarModal.value = false;
    }

    const openChangeAvatarModal = () => {
        fileInput.value?.click()
        console.log(fileInput.value)
    }

    return {
        openAvatarModal,
        closeAvatarModal,
        openChangeAvatarModal,
        avatarModal,
        fileInput
    }
}