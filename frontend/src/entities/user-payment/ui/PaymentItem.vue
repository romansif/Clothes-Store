<template>
  <li class="mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg font-dm-sans">
    <div class="flex flex-col gap-5">
      <div class="flex items-center justify-between">
<!--        <span class="text-sm font-semibold">-->
<!--          {{ t("checkout.card.itemCvv") }} <span class="font-normal">{{ props.payment.cardCvv }}</span>-->
<!--        </span>-->
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemCardNumber") }} <span class="font-normal">{{ props.payment.cardNumber }}</span>
        </span>
        <div class="flex items-center gap-2.5">
          <img
              @click="emit('updateCard', props.payment.id)"
              :src="edit"
              alt=""
              class="w-5 cursor-pointer transition duration-400 hover:scale-110"
          />
          <img
            @click="emit('deletePayment', t('confirm.deleteCard'), 'DELETE_SAVED_CARD', props.payment.id)"
            :src="del"
            alt=""
            class="w-6 cursor-pointer transition duration-400 hover:scale-110"
          />
        </div>
      </div>
      <div class="flex items-center gap-5">
        <span class="text-sm font-semibold">
          {{ t("checkout.card.itemExpiry") }} <span class="font-normal">{{ props.payment.expiryDate }},</span>
        </span>
        <span v-if="props.payment.cardName" class="text-sm font-semibold">
          {{ t("checkout.card.itemCardName") }} <span class="font-normal">{{ props.payment.cardName }}</span>
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { UserPayment } from "@/shared/model";

import del from "@/assets/icons/delete-close/delete.svg";
import edit from "@/assets/icons/my-products/pencil.svg";

const props = defineProps<{
  payment: UserPayment;
}>();

const emit = defineEmits<{
  deletePayment: [title: string, type: string, id: string];
  updateCard: [id: string]
}>();

const { t } = useI18n();
</script>
