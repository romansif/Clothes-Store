<template>
  <li :class="[getSavedClass, isChosenContactInfo ? checkClass : '']">
    <div class="flex flex-col gap-5">
      <span class="text-sm font-semibold">
        {{ t("checkout.item.phone") }} <span class="font-normal">{{ address.phone }},</span>
      </span>
      <span class="text-sm font-semibold">
        {{ t("checkout.item.email") }} <span class="font-normal">{{ address.email }}</span>
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { getSavedClass, checkClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenContactInfo } from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/user-address";
import { useI18n } from "vue-i18n";

defineProps<{
  address: UserContactInfo;
}>();

const { t } = useI18n();
</script>
