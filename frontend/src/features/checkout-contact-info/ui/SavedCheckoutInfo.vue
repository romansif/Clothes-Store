<template>
  <div class="flex flex-col gap-5 pt-5 font-[Montserrat]">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <h1 class="text-sm font-medium">{{ t("checkout.contactInfo") }}</h1>
        <span @click="toggleShowContact" class="cursor-pointer text-xs text-indigo-500 hover:text-violet-600">
          {{ t("checkout.hideSavedContact") }}
        </span>
      </div>
      <CheckoutContactList />
    </div>
    <div class="flex flex-col">
      <h1 class="text-sm font-medium">{{ t("checkout.shippingAddress") }}</h1>
      <CheckoutAddressList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { toggleInformation } from "@/features/checkout-contact-info/lib/toggle-contact-info";
import { CheckoutAddressList, CheckoutContactList } from "@/widgets/checkout-info-lists";

const { t } = useI18n();
const { toggleShowContact } = toggleInformation();
</script>
