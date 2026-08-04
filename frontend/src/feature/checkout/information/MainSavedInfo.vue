<script setup lang="ts">
import { checkout } from "@/feature/checkout/composables/checkout.ts";

import ContactInfoList from "@/feature/checkout/information/contact-info/ContactInfoList.vue";
import AddressInfoList from "@/feature/checkout/information/address-info/AddressInfoList.vue";

const { toggleShowSaved } = checkout();
</script>

<template>
  <div class="flex flex-col gap-5 pt-5 font-[Montserrat]">
    <div class="flex flex-col">
      <h1 class="text-sm font-medium">CONTACT INFO</h1>
      <ContactInfoList />
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between">
        <h1 class="text-sm font-medium">SHIPPING ADDRESS</h1>
        <span @click="toggleShowSaved" class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
          Hide saved info
        </span>
      </div>
      <AddressInfoList />
    </div>
  </div>
</template>

<style scoped>

</style>