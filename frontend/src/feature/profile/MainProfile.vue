<script setup lang="ts">
import { onMounted } from "vue";
import { useGetUsers } from "../auth/auth-composables/getUsers.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";
import { useProductsModals } from "@/shared/composables/modals/products/productsModals.ts";

import NavBar from '../navigation/NavBar.vue'
import ProfileSettings from "./profile-items/ProfileSettings.vue";
import ProfileNotLogin from "./profile-items/ProfileNotLogin.vue";
import ChangeAvatar from "@/shared/ui/profile-modals/ChangeAvatar.vue";
import Notification from "@/shared/ui/products-modals/Notification.vue";
import CreateProduct from "@/shared/ui/profile-modals/CreateProduct.vue";
import OrdersModal from "@/shared/ui/profile-modals/order-history/OrdersModal.vue";
import CurrentOrderModal from "@/shared/ui/profile-modals/current-order/CurrentOrderModal.vue";
import AddressesCardsModal from "@/shared/ui/profile-modals/address-and-cards/AddressesCardsModal.vue";
import ConfidentialityModal from "@/shared/ui/profile-modals/confidentiality-data/ConfidentialityModal.vue";
import ChoiceModal from "@/shared/ui/ChoiceModal.vue";

const { user } = usersStore();
const { getUser } = useGetUsers();
const { createProduct, notify } = useProductsModals();
const { avatarModal, orderHistory, currentOrder, addressesAndCards, confidentialityData, deleteChoice } = useProfileModals();

const userId = localStorage.getItem("userId");
onMounted(async () => {
  await getUser();
})
</script>

<template>
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
  </div>
  <div :class="['font-[Montserrat] flex justify-center items-center', user.role === 'Buyer' ? 'p-35' : 'p-15']">
    <div class="w-[350px] sm:w-[600px] md:w-[700px] lg:w-[950px] xl:w-[700px]">
      <ProfileNotLogin v-if="!userId"/>
      <ProfileSettings  v-if="userId"/>
    </div>
  </div>
  <Transition>
    <ChangeAvatar v-if="avatarModal" />
  </Transition>
  <Transition>
    <CreateProduct v-if="createProduct" />
  </Transition>
  <Transition>
    <OrdersModal v-if="orderHistory"/>
  </Transition>
  <Transition>
    <CurrentOrderModal v-if="currentOrder"/>
  </Transition>
  <Transition>
    <AddressesCardsModal v-if="addressesAndCards"/>
  </Transition>
  <Transition>
    <ConfidentialityModal v-if="confidentialityData"/>
  </Transition>
  <Transition>
    <Notification v-if="notify"/>
  </Transition>
  <Transition>
    <ChoiceModal v-if="deleteChoice"/>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>