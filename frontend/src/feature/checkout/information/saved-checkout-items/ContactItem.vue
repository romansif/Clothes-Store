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
const { userAddresses } = usersStore();
const { savedContactClass } = informationClasses()
const { useSavedContactInfo } = useAddress();

import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useAddress } from "@/feature/checkout/checkout-actions/use.address.ts";
import { informationClasses } from "@/shared/composables/style/checkout-style/information.classes.ts";
</script>

<style scoped>

</style>