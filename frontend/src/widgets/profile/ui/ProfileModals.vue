<template>
  <Transition name="modal">
    <ChangeAvatarModal v-if="avatarModal" />
  </Transition>
  <Transition name="modal">
    <ReplacementOrder v-if="replaceOrder" />
  </Transition>
  <Transition name="modal">
    <ReplacementOrderItem v-if="replaceItem" />
  </Transition>
  <Transition name="modal">
    <SavedAddressModal v-if="savedAddresses" />
  </Transition>
  <Transition name="modal">
    <SavedPaymentModal v-if="savedPaymentCard" />
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
import { replaceItem, replaceOrder } from "@/entities/order-action/lib/order-modal";
import { SavedPaymentModal } from "@/features/user-saved-payment-cards-modal";
import { ProfileDataModal } from "@/features/profile-data";
import { ReplacementOrder, ReplacementOrderItem } from "@/features/replace-order-modal";
import { SavedAddressModal } from "@/features/user-saved-addres-modal";
import { DeleteModal } from "@/features/general-delete";
import { ChangeAvatarModal } from "@/features/profile-change-avatar";

const { deleteModal } = baseDeleteModal();
const { savedAddresses, savedPaymentCard, confidentialityData } = useProfileModals();
</script>
