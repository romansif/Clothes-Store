<template>
  <form class="flex flex-col items-start gap-3.5">
    <ReplacementInput
      v-model="cancelChoiceForm.cancelChoice"
      :name="t('orders.reason.paymentMethod')"
      :value="'Incorrect payment method'"
    />
    <ReplacementInput
      v-model="cancelChoiceForm.cancelChoice"
      :name="t('orders.reason.wrongAddress')"
      :value="'I entered the wrong address'"
    />
    <ReplacementInput
      v-model="cancelChoiceForm.cancelChoice"
      :name="t('orders.reason.noLongerNeed')"
      :value="'I no longer need this item'"
    />
    <ReplacementInput
      v-model="cancelChoiceForm.cancelChoice"
      :name="t('orders.reason.byMistake')"
      :value="'Ordered it by mistake'"
    />
    <ReplacementInput
      v-model="cancelChoiceForm.cancelChoice"
      :name="t('orders.reason.betterProduct')"
      :value="'I found a better product'"
    />
    <span v-if="cancelChoiceMessage.cancelChoice" class="px-4 text-xs text-red-600">
      {{ cancelChoiceMessage.cancelChoice }}
    </span>
    <div class="ml-auto flex">
      <UiButton type="submit" :name="t('orders.confirmCancel')" variant="replaceAndReview" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order-forms";
import { UiButton } from "@/shared/ui/button";
import { ReplacementInput } from "@/shared/ui/replacement-input";

const { t } = useI18n();
</script>
