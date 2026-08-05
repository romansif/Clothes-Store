<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { useOrders } from "@/feature/products/composables/use.orders.ts";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import ReplacementInput from "@/shared/ui/base/input/ReplacementInput.vue";

const { updateOrderStatus } = useOrders();
const { toggleOrder, cancelChoice } = useBaseModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div class="flex flex-col gap-4 bg-white w-[700px] h-[610px] rounded-xl p-5">
      <BaseButton @click.stop="toggleOrder" name="Exit" variant="exitClose"/>
      <div class="flex flex-col gap-2 border-b pb-4">
        <h1 class="font-bold text-2xl">REPLACEMENT OF ORDER</h1>
        <span class="text-sm text-[#A3A3A3]">Select the reason why you want to cancel the order.</span>
      </div>
      <div class="flex flex-col items-start gap-5">
        <ReplacementInput v-model="cancelChoice" name="Incorrect payment method" variant="choice" :value="'1'"/>
        <ReplacementInput v-model="cancelChoice" name="I entered the wrong address." variant="choice" :value="'2'"/>
        <ReplacementInput v-model="cancelChoice" name="I no longer need this item." variant="choice" :value="'3'"/>
        <ReplacementInput v-model="cancelChoice" name="Ordered it by mistake." variant="choice" :value="'4'"/>
        <ReplacementInput v-model="cancelChoice" name="I found a better product." variant="choice" :value="'5'"/>
      </div>
      <div class="flex ml-auto">
        <BaseButton @click.stop="updateOrderStatus" name="REPLACEMENT" variant="profileForm" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>