import { ref } from 'vue';

const avatarModal = ref(false);

export const useProfile = () => {
    const openAvatarModal = () => {
        avatarModal.value = true;
    }

    const closeAvatarModal = () => {
        avatarModal.value = false;
    }

    return {
        openAvatarModal,
        closeAvatarModal,
        avatarModal,
    }
}