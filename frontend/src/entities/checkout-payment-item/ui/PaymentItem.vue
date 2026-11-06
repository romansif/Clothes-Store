<template>
  <li :class="[getSavedClass, isChosenPayment ? checkClass : '']">
    <div class="flex flex-col gap-5">
      <div class="flex gap-5">
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemExpiry") }}
          <span class="font-dm-sans font-normal">{{ props.payment.expiryDate }}</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemCvv") }}
          <span class="font-dm-sans font-normal">{{ props.payment.cardCvv }}</span>
        </span>
      </div>
      <div class="flex gap-5">
        <span v-if="props.payment.cardName" class="text-sm font-semibold">
          {{ t("checkout.card.itemCardName") }}
          <span class="font-dm-sans font-normal">{{ props.payment.cardName }}</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemCardName") }}
          <span class="font-normal">{{ props.payment.cardNumber }}</span>
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getSavedClass, checkClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import type { UserPayment } from "@/entities/checkout-payment-item";

const props = defineProps<{
  payment: UserPayment;
}>();

const { t } = useI18n();
</script>
