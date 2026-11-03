<template>
  <Transition name="modal">
    <ChangeAvatarModal v-if="avatarModal" />
  </Transition>
  <Transition name="modal">
    <AllOrderModal v-if="orderHistory" />
  </Transition>
  <Transition name="modal">
    <CurrentOrderModal v-if="currentOrder" />
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
import { SavedPaymentModal } from "@/features/user-saved-payment-cards-modal";
import { ProfileDataModal } from "@/features/profile-data";
import { CurrentOrderModal, AllOrderModal } from "@/features/order-modals";
import { SavedAddressModal } from "@/features/user-saved-addres-modal";
import { DeleteModal } from "@/features/general-delete";
import { ChangeAvatarModal } from "@/features/profile-change-avatar";

const { deleteModal } = baseDeleteModal();
const { orderHistory, currentOrder, savedAddresses, savedPaymentCard, confidentialityData } = useProfileModals();
</script>
