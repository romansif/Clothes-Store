<script setup lang="ts">
import { onMounted } from "vue";
import { useAddress } from "@/feature/checkout/composables/use.address.ts";
import { checkout } from "@/feature/checkout/composables/checkout.ts";

import ContactList from "@/feature/checkout/information/use-saved-lists/ContactList.vue";
import SavedAddressList from "@/feature/checkout/information/use-saved-lists/SavedAddressList.vue";

const { toggleShowContact } = checkout();
const { getAddresses } = useAddress();

onMounted(async () => {
  await getAddresses();
})
</script>

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
      <SavedAddressList />
    </div>
  </div>
</template>

<style scoped>

</style>