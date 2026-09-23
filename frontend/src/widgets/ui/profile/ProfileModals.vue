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
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";

import SavedPaymentModal from "@/features/use-user-payment/ui/SavedPaymentModal.vue";
import ChangeAvatarModal from "@/features/use-profile/ui/ChangeAvatarModal.vue";
import CurrentOrderModal from "@/features/use-order/ui/CurrentOrderModal.vue";
import AllOrderModal from "@/features/use-order/ui/AllOrderModal.vue";
import SavedAddressModal from "@/features/use-user-address/ui/SavedAddressModal.vue";
import UserDataModal from "@/features/use-profile/ui/UserDataModal.vue";
import DeleteModal from "@/features/use-general-delete/ui/DeleteModal.vue";

const { deleteModal } = baseDeleteModal();
const {
  avatarModal, orderHistory,
  currentOrder, savedAddresses, savedPaymentCard,
  confidentialityData
} = useProfileModals();
</script>


<style scoped>

</style>