<template>
  <TransitionGroup name="list">
    <li @click="useSavedAddress(checkout)" v-for="checkout in userAddresses" :key="checkout.id"
        :class="savedAddressClass">
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

<script setup lang="ts">

const { userAddresses } = checkoutStore();
const { useSavedAddress } = addressApi();
const { savedAddressClass } = informationClasses()

import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { addressApi } from "@/feature/use-checkout/api/address.api.ts";
import { informationClasses } from "@/shared/constants/checkout/information.classes.ts";
</script>

<style scoped>

</style>