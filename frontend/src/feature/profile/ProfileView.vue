<script setup lang="ts">
import { onMounted } from "vue";
import { useGetUsers } from "@/feature/auth/auth-actions/get.users";
import { usersStore } from "@/shared/composables/stores/users.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals";
import { useProductsModals } from "@/shared/composables/modals/products.modals";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import NavBar from '../navigation/NavBar.vue'
import DeleteModal from "@/shared/ui/base/base-modals/DeleteModal.vue";
import ProfileSettings from "./profile-items/ProfileSettings.vue";
import ProfileNotLogin from "./profile-items/ProfileNotLogin.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import ChangeAvatar from "@/shared/ui/profile-modals/ChangeAvatar.vue";
import CreateProduct from "@/shared/ui/products-modals/CreateProduct.vue";
import AllOrders from "@/shared/ui/orders/AllOrders.vue";
import CurrentOrder from "@/shared/ui/orders/CurrentOrder.vue";
import AddressPaymentInfo from "@/shared/ui/profile-modals/address-and-cards/AddressPaymentInfo.vue";
import UserDataModal from "@/shared/ui/profile-modals/confidentiality-data/UserDataModal.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";

const { user } = usersStore();
const { getUser } = useGetUsers();
const { notify, loading } = useBaseModals();
const { createProduct } = useProductsModals();
const { avatarModal, orderHistory, currentOrder, addressesAndCards, confidentialityData, deleteChoice } = useProfileModals();

const userId = localStorage.getItem("userId");

onMounted(async () => {
  loading.value = true;

  await getUser();

  loading.value = false;
})
</script>

<template>
  <Loading v-if="loading" />
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
  </div>
  <div :class="['font-[Montserrat] flex justify-center my-items-center', user?.role === 'Buyer' ? 'p-35' : 'p-15']">
    <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
      <ProfileNotLogin v-if="!userId" />
      <ProfileSettings v-if="userId" />
    </div>
  </div>
  <Transition name="notify">
    <ChangeAvatar v-if="avatarModal" />
  </Transition>
  <Transition name="notify">
    <CreateProduct v-if="createProduct" />
  </Transition>
  <Transition name="notify">
    <AllOrders v-if="orderHistory" />
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

<style scoped>

</style>