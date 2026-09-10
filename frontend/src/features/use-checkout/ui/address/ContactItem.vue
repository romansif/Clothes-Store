<template>
  <TransitionGroup name="list">
    <li @click="useSavedContactInfo(checkout)" v-for="checkout in userAddresses" :key="checkout.id"
        :class="savedContactClass">
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

<script setup lang="ts">
import { useAddAddress } from "@/features/use-checkout/api/address/add-address.ts";
import { checkoutStore } from "@/features/use-checkout/model/checkout.store.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";

const { userAddresses } = checkoutStore();
const { savedContactClass } = informationClasses()
const { useSavedContactInfo } = useAddAddress();
</script>

<style scoped>

</style>