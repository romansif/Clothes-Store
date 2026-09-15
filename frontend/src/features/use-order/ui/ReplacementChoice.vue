<template>
  <div @click="toggleOrder('')" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex flex-col gap-2 bg-white w-175 h-152.5 rounded-xl p-5">
      <BaseButton @click="toggleOrder"
                  name="Exit"
                  variant="exitClose" />
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="font-bold text-2xl">
          REPLACEMENT OF ORDER
        </h1>
        <span class="text-sm text-[#A3A3A3]">
          Select the reason why you want to cancel the order
        </span>
      </div>
      <form @submit.prevent="replaceOrder" class="flex flex-col items-start gap-3.5">
        <ReplacementInput v-model="cancelChoice"
                          name="Incorrect payment method"
                          :value="'Incorrect payment method'"/>
        <ReplacementInput v-model="cancelChoice"
                          name="I entered the wrong address"
                          :value="'I entered the wrong address'"/>
        <ReplacementInput v-model="cancelChoice"
                          name="I no longer need this item"
                          :value="'I no longer need this item'"/>
        <ReplacementInput v-model="cancelChoice"
                          name="Ordered it by mistake"
                          :value="'Ordered it by mistake'"/>
        <ReplacementInput v-model="cancelChoice"
                          name="I found a better product"
                          :value="'I found a better product'"/>
        <span v-if="cancelChoiceError" class="text-red-600 text-xs px-4">{{ cancelChoiceMessage }}</span>
        <div class="flex ml-auto">
          <BaseButton type="submit"
                      name="REPLACEMENT"
                      variant="profileForm" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useDeleteOrder } from "@/features/use-order/api/delete-order.ts";
import { cancelChoiceError, cancelChoiceMessage } from "@/shared/lib/base-modal.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import ReplacementInput from "@/features/use-order/ui/ReplacementInput.vue";

const { replaceOrder } = useDeleteOrder();
const { toggleOrder, cancelChoice } = useBaseModals();

watch(() => [cancelChoice.value],([choice]) => {
      if(choice){
        cancelChoiceError.value = false;
      }
    }
);
</script>

<style scoped>

</style>