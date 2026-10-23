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
    <UserDataModal v-if="confidentialityData" />
  </Transition>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { SavedPaymentModal } from "@/features/use-user-payment";
import { ChangeAvatarModal, UserDataModal } from "@/features/use-profile";
import { CurrentOrderModal, AllOrderModal } from "@/features/order-modals";
import { SavedAddressModal } from "@/features/use-user-address";
import { DeleteModal } from "@/features/use-general-delete";

const { deleteModal } = baseDeleteModal();
const {
  avatarModal, orderHistory,
  currentOrder, savedAddresses, savedPaymentCard,
  confidentialityData
} = useProfileModals();
</script>
