<template>
  <li :class="[getSavedClass, isChosenAddress ? checkClass : '']">
    <div class="flex flex-col gap-5">
      <div class="flex">
        <span class="text-sm font-semibold">
          {{ t("checkout.item.address") }} <span class="font-normal">{{ props.address.address }}</span>
        </span>
      </div>
      <div class="flex gap-5">
        <span class="text-sm font-semibold">
          {{ t("checkout.item.country") }} <span class="font-normal">{{ props.address.country }}</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.item.city") }} <span class="font-normal">{{ props.address.city }}</span>
        </span>
      </div>
      <span v-if="props.address.addressName" class="text-sm font-semibold">
        {{ t("checkout.item.addressName") }} <span class="font-normal">{{ props.address.addressName }},</span>
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getSavedClass, checkClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenAddress } from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/user-address";

const props = defineProps<{
  address: UserContactInfo;
}>();

const { t } = useI18n();
</script>
