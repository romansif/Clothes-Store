<template>
  <div :class="['bg-[#F0F0F0]', isMyProducts ? '' : 'h-screen']">
    <Loading v-if="loading" />
    <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
    </div>
    <router-view />
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { stackInfo } from "@/features/use-my-product/lib/toggle.my.product.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

import Loading from "@/widgets/Loading.vue";
import AddressPaymentInfo from "@/features/use-profile/ui/AddressPaymentInfo.vue";
import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import ChangeAvatar from "@/features/use-profile/ui/ChangeAvatar.vue";
import Orders from "@/features/use-order/ui/Orders.vue";
import CurrentOrder from "@/features/use-order/ui/CurrentOrder.vue";
import UserDataModal from "@/features/use-profile/ui/privacy/UserDataModal.vue";
import Notification from "@/shared/ui/Notification.vue";
import MyProductStackInfo from "@/features/use-my-product/ui/MyProductStackInfo.vue";

const route = useRoute();

const { loading, notify } = useBaseModals();
const { avatarModal, orderHistory, currentOrder, addressesAndCards, confidentialityData, deleteChoice } = useProfileModals();

const isMyProducts = computed(() => route.name === 'my/products');
</script>

<style scoped>

</style>