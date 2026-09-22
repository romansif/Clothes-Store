<template>
  <Transition name="notify">
    <ChangeAvatarModal v-if="avatarModal" />
  </Transition>
  <Transition name="notify">
    <AllOrderModal v-if="orderHistory" />
  </Transition>
  <Transition name="notify">
    <CurrentOrderModal v-if="currentOrder" />
  </Transition>
  <Transition name="notify">
    <SavedAddressModal v-if="savedAddresses" />
  </Transition>
  <Transition name="notify">
    <SavedPaymentModal v-if="savedPaymentCard" />
  </Transition>
  <Transition name="notify">
    <UserDataModal v-if="confidentialityData" />
  </Transition>
  <Transition name="notify">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/widgets/lib/base-delete-modal.ts";
import { useProfileModals } from "@/shared/lib/profile-modal.ts";

import SavedPaymentModal from "@/features/use-user-payment/ui/SavedPaymentModal.vue";
import ChangeAvatarModal from "@/features/use-profile/ui/ChangeAvatarModal.vue";
import CurrentOrderModal from "@/features/use-order/ui/CurrentOrderModal.vue";
import AllOrderModal from "@/features/use-order/ui/AllOrderModal.vue";
import SavedAddressModal from "@/features/use-user-address/ui/SavedAddressModal.vue";
import UserDataModal from "@/features/use-profile/ui/UserDataModal.vue";
import DeleteModal from "@/widgets/ui/DeleteModal.vue";

const { deleteModal } = baseDeleteModal();
const {
  avatarModal, orderHistory,
  currentOrder, savedAddresses, savedPaymentCard,
  confidentialityData
} = useProfileModals();
</script>


<style scoped>

</style>