<template>
  <Transition name="notify">
    <MyProductStackInfo v-if="stackInfo" />
  </Transition>
  <Transition name="notify">
    <ChangeAvatar v-if="avatarModal" />
  </Transition>
  <Transition name="notify">
    <Orders v-if="orderHistory" />
  </Transition>
  <Transition name="notify">
    <CurrentOrder v-if="currentOrder" />
  </Transition>
  <Transition name="notify">
    <AddressPaymentInfo v-if="addressesAndCards" />
  </Transition>
  <Transition name="notify">
    <UserDataModal v-if="confidentialityData" />
  </Transition>
  <Transition name="notify">
    <Notification v-if="notify" />
  </Transition>
  <Transition name="notify">
    <DeleteModal v-if="deleteChoice" />
  </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { stackInfo } from "@/features/use-my-product/lib/toggle-stack-info.ts";

import AddressPaymentInfo from "@/features/use-profile/ui/AddressPaymentInfo.vue";
import MyProductStackInfo from "@/features/use-my-product/ui/MyProductStackInfo.vue";
import ChangeAvatar from "@/features/use-profile-form/ui/ChangeAvatar.vue";
import Notification from "@/shared/ui/Notification.vue";
import UserDataModal from "@/features/use-profile/ui/UserDataModal.vue";
import CurrentOrder from "@/features/use-order/ui/CurrentOrder.vue";
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import Orders from "@/features/use-order/ui/Orders.vue";

const { notify } = useBaseModals();
const { avatarModal, orderHistory, currentOrder, addressesAndCards, confidentialityData, deleteChoice } = useProfileModals();
</script>


<style scoped>

</style>