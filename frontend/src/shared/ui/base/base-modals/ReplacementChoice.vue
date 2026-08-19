<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { useOrders } from "@/feature/products/products-actions/use.orders.ts";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import ReplacementInput from "@/shared/ui/base/input/ReplacementInput.vue";
import {watch} from "vue";

const { replaceOrder } = useOrders();
const { toggleOrder, cancelChoice, cancelChoiceMessage, cancelChoiceError } = useBaseModals();

watch(() => [cancelChoice.value],([choice]) => {
      if(choice){
        cancelChoiceError.value = false;
      }
    }
);
</script>

<template>
  <div @click="toggleOrder('')" class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex flex-col gap-2 bg-white w-175 h-[6h-152.5nded-xl p-5">
      <BaseButton @click="toggleOrder" name="Exit" variant="exitClose"/>
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="font-bold text-2xl">REPLACEMENT OF ORDER</h1>
        <span class="text-sm text-[#A3A3A3]">Select the reason why you want to cancel the order.</span>
      </div>
      <div class="flex flex-col items-start gap-5">
        <ReplacementInput v-model="cancelChoice" name="Incorrect payment method" variant="choice"
                          :value="'Incorrect payment method'"/>
        <ReplacementInput v-model="cancelChoice" name="I entered the wrong address" variant="choice"
                          :value="'I entered the wrong address'"/>
        <ReplacementInput v-model="cancelChoice" name="I no longer need this item" variant="choice"
                          :value="'I no longer need this item'"/>
        <ReplacementInput v-model="cancelChoice" name="Ordered it by mistake" variant="choice"
                          :value="'Ordered it by mistake'"/>
        <ReplacementInput v-model="cancelChoice" name="I found a better product" variant="choice"
                          :value="'I found a better product'"/>
      </div>
      <span v-if="cancelChoiceError" class="text-red-600 text-xs px-4">{{ cancelChoiceMessage }}</span>
      <div class="flex ml-auto">
        <BaseButton @click.stop="replaceOrder" name="REPLACEMENT" variant="profileForm" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>