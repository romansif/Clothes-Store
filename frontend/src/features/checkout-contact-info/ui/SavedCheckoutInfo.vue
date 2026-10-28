<template>
  <div class="flex flex-col gap-5 pt-5 font-[Montserrat]">
    <div class="flex flex-col">
      <div class="flex justify-between">
      <h1 class="text-sm font-medium">CONTACT INFO</h1>
      <span @click="toggleShowContact"
            class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
        Hide saved contact
      </span>
      </div>
      <CheckoutContactList />
    </div>
    <div class="flex flex-col">
      <h1 class="text-sm font-medium">SHIPPING ADDRESS</h1>
      <CheckoutAddressList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleInformation } from "@/features/checkout-contact-info/lib/toggle-contact-info";
import { CheckoutAddressList, CheckoutContactList } from "@/widgets/checkout-info-lists";

const { toggleShowContact } = toggleInformation();
</script>
