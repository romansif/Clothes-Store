<template>
  <li class="mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg">
    <div class="flex flex-col gap-5">
      <div class="flex gap-5">
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemExpiry") }}
          <span class="font-dm-sans font-normal">{{ props.payment.expiryDate }},</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemCvv") }} <span class="font-dm-sans font-normal">{{ props.payment.cardCvv }}</span>
        </span>
        <img
          @click="emit('deletePayment', t('confirm.deleteCard'), 'DELETE_SAVED_CARD', props.payment.id)"
          :src="del"
          alt=""
          class="ml-auto w-5 cursor-pointer transition duration-400 hover:scale-120"
        />
      </div>
      <div class="flex gap-5">
        <span v-if="props.payment.cardName" class="text-sm font-semibold">
          {{ t("checkout.card.itemCardNumber") }} <span class="font-normal">{{ props.payment.cardName }}</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemCardName") }}
          <span class="font-dm-sans font-normal">{{ props.payment.cardNumber }}</span>
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { UserPayment } from "@/entities/checkout-payment-item";

import del from "@/assets/icons/delete-close/delete.svg";

const props = defineProps<{
  payment: UserPayment;
}>();

const emit = defineEmits<{
  deletePayment: [title: string, type: string, id: string];
}>();

const { t } = useI18n();
</script>
