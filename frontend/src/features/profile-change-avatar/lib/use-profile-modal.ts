import { avatarModal } from "@/features/profile-change-avatar/model/profile-modal.store";
import { fileInput } from "@/shared/lib/product-helper";

export const toggleAvatar = () => {
    avatarModal.value = !avatarModal.value;
};

export const openSelectAvatar = () => {
    fileInput.value?.click();
};
