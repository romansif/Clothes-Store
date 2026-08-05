<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals";

import del from '@/app/assets/icons/delete-close/del_address_card.svg'

const { userAddresses } = usersStore();
const { toggleDeleteChoice } = useProfileModals();
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="checkout in userAddresses" :key="checkout.id"
        class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2">
      <div class="flex flex-col gap-5">
        <div class="flex">
          <span class="text-sm font-semibold">
            Address: <span class="font-normal">{{ checkout.address }}</span>
          </span>
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this saved address?', 'DELETE_SAVED_ADDRESS', checkout.id)"
               :src="del" alt="" class="w-[20px] ml-auto transition duration-400 hover:scale-120">
        </div>
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Country: <span class="font-normal">{{ checkout.country }},</span>
          </span>
          <span class="text-sm font-semibold">
            City: <span class="font-normal">{{ checkout.city }}</span>
          </span>
        </div>
        <span v-if="checkout.addressName" class="text-sm font-semibold">
          Address Name: <span class="font-normal">{{ checkout.addressName }},</span>
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>