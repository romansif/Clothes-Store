<template>
  <div class="flex flex-col gap-5 pt-5 font-[Montserrat]">
    <div class="flex flex-col">
      <div class="flex justify-between">
      <h1 class="text-sm font-medium">CONTACT INFO</h1>
      <span @click="toggleShowContact" class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
          Hide saved contact
      </span>
      </div>
      <ContactList />
    </div>
    <div class="flex flex-col">
      <h1 class="text-sm font-medium">SHIPPING ADDRESS</h1>
      <AddressList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info.ts";

import ContactList from "@/features/use-checkout-contact-info/ui/ContactList.vue";
import AddressList from "@/widgets/ui/contact-info/AddressList.vue";

const { toggleShowContact } = toggleInformation();
</script>

<style scoped>

</style>