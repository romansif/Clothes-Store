<template>
  <div class="flex flex-col gap-5 pt-5 font-[Montserrat]">
    <div class="flex flex-col">
      <h1 class="text-sm font-medium">CONTACT INFO</h1>
      <ContactList />
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between">
        <h1 class="text-sm font-medium">SHIPPING ADDRESS</h1>
        <span @click="toggleShowContact" class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
          Hide saved contact
        </span>
      </div>
      <AddressList />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAddresses } = addressApi();
const { toggleShowContact } = checkoutApi();

import { onMounted } from "vue";
import { addressApi } from "@/feature/checkout/api/address.api.ts";
import { checkoutApi } from "@/feature/checkout/api/checkout.api.ts";

import ContactList from "@/feature/checkout/ui/ContactList.vue";
import AddressList from "@/feature/checkout/ui/AddressList.vue";

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>