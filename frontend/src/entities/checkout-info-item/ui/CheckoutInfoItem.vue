<template>
  <li :class="[getSavedClass, isChosenContactInfo ? checkClass : '']">
    <div class="flex flex-col gap-5">
      <span class="text-sm font-semibold">
        {{ t("checkout.item.phone") }} <span class="font-normal">{{ props.address.phone }},</span>
      </span>
      <span class="text-sm font-semibold">
        {{ t("checkout.item.email") }} <span class="font-normal">{{ props.address.email }}</span>
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { getSavedClass, checkClass } from "@/shared/model";
import { isChosenContactInfo } from "@/entities/checkout-info-item";
import type { UserContactInfo } from "@/shared/model";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  address: UserContactInfo;
}>();

const { t } = useI18n();
</script>
