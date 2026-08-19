<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { checkout } from "@/feature/checkout/checkout-actions/checkout.ts";
import { useAddress } from "@/feature/checkout/checkout-actions/use.address.ts";

const { userAddresses } = usersStore();
const { isChosenContactInfo } = checkout();
const { useSavedContactInfo } = useAddress();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="useSavedContactInfo(checkout.email, checkout.phone, checkout.id)" v-for="checkout in userAddresses" :key="checkout.id" :class="[`flex flex-col mt-5 transition duration-400 bg-[#D9D9D9]/40
        hover:bg-gray-50 border border-gray-300 rounded-xl p-2`, isChosenContactInfo ? 'bg-gray-50' : '']">
      <div class="flex flex-col gap-5">
          <span class="text-sm font-semibold">
            Phone: <span class="font-normal">{{ checkout.phone }},</span>
          </span>
          <span class="text-sm font-semibold">
            Email: <span class="font-normal">{{ checkout.email }}</span>
          </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>

</style>