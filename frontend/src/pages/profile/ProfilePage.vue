<template>
  <div class='bg-[#F0F0F0] h-screen'>
    <Loading v-if="loading" />
    <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
    </div>
    <div :class="isProfileLoginClass(user)">
      <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
        <ProfileNotLoggedIn v-if="!user.id" />
        <ProfileSettings v-if="user.id" />
      </div>
    </div>
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
const { user } = userStore();
const { getUser } = useGetUsers();
const { notify, loading } = useBaseModals();
const { isProfileLoginClass } = profileClasses();
const { avatarModal, orderHistory, currentOrder, addressesAndCards, confidentialityData, deleteChoice } = useProfileModals();

import { onMounted } from "vue";
import { useGetUsers } from "@/feature/auth/api/users.api.ts";
import { userStore } from "@/feature/profile/model/user.store.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modal.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { profileClasses } from "@/shared/constants/user/profile.classes.ts";

import MainNavBar from '@/feature/navigation/ui/MainNavBar.vue'
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import ProfileSettings from "@/feature/profile/ui/ProfileSettings.vue";
import ProfileNotLoggedIn from "@/feature/profile/ui/ProfileNotLoggedIn.vue";
import Notification from "@/shared/ui/Notification.vue";
import ChangeAvatar from "@/feature/profile/ui/ChangeAvatar.vue";
import Orders from "@/feature/order/ui/Orders.vue";
import CurrentOrder from "@/feature/order/ui/CurrentOrder.vue";
import AddressPaymentInfo from "@/feature/profile/ui/AddressPaymentInfo.vue";
import UserDataModal from "@/feature/profile/ui/privacy/UserDataModal.vue";
import Loading from "@/shared/ui/Loading.vue";

onMounted(async () => {
  loading.value = true;

  await getUser();

  loading.value = false;
})
</script>

<style scoped>

</style>