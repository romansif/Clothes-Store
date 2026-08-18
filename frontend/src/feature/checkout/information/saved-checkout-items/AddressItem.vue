<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { useAddress } from "@/feature/checkout/composables/use.address.ts";

const { userAddresses } = usersStore();
const { isChosenAddress } = checkout();
const { useSavedAddress } = useAddress();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="useSavedAddress(checkout.addressName, checkout.firstName, checkout.lastName, checkout.country,
        checkout.stateRegion, checkout.address, checkout.city, checkout.postalCode)" v-for="checkout in userAddresses" :key="checkout.id"
        :class="[`flex flex-col mt-5 transition duration-400 bg-[#D9D9D9]/40
        hover:bg-gray-50 border border-gray-300 rounded-xl p-2`, isChosenAddress ? 'bg-gray-50' : '']">
      <div class="flex flex-col gap-5">
        <div class="flex">
          <span class="text-sm font-semibold">
            Address: <span class="font-normal">{{ checkout.address }}</span>
          </span>
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

</style>