<template>
  <Transition name="modal">
    <ChangeAvatarModal v-if="avatarModal" />
  </Transition>
  <Transition name="modal">
    <SavedAddressModal v-if="savedAddresses" />
  </Transition>
  <Transition name="modal">
    <EditAddressModal v-if="editAddressModal"/>
  </Transition>
  <Transition name="modal">
    <SavedPaymentModal v-if="savedPaymentCard" />
  </Transition>
  <Transition name="modal">
    <EditCardModal v-if="editCardModal"/>
  </Transition>
  <Transition name="modal">
    <ProfileDataModal v-if="confidentialityData" />
  </Transition>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { avatarModal } from "@/features/profile-change-avatar/model/profile-modal.store";
import { editAddressModal } from "@/features/edit-saved-address/lib/toggle-edit-address";
import { editCardModal } from "@/features/edit-saved-card/lib/toggle-edit-card";
import { SavedPaymentModal } from "@/features/user-saved-payment-cards-modal";
import { ProfileDataModal } from "@/features/profile-data";
import { SavedAddressModal } from "@/features/user-saved-addres-modal";
import { DeleteModal } from "@/features/general-delete";
import { ChangeAvatarModal } from "@/features/profile-change-avatar";
import { EditAddressModal } from "@/features/edit-saved-address";
import { EditCardModal } from "@/features/edit-saved-card";

const { deleteModal } = baseDeleteModal();
const { savedAddresses, savedPaymentCard, confidentialityData } = useProfileModals();
</script>
