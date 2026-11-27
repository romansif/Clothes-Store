export { default as ChangeAvatarModal } from "./ui/ChangeAvatarModal.vue";

export { avatarModal } from "./model/profile-modal.store";
export { toggleAvatar, openSelectAvatar } from "./lib/use-profile-modal";
export { useChangeAvatar } from "./api/update-avatar";
