<template>
  <ReplacementInput v-model="cancelChoiceForm.cancelChoice"
                    name="Incorrect payment method"
                    :value="'Incorrect payment method'"/>
  <ReplacementInput v-model="cancelChoiceForm.cancelChoice"
                    name="I entered the wrong address"
                    :value="'I entered the wrong address'"/>
  <ReplacementInput v-model="cancelChoiceForm.cancelChoice"
                    name="I no longer need this item"
                    :value="'I no longer need this item'"/>
  <ReplacementInput v-model="cancelChoiceForm.cancelChoice"
                    name="Ordered it by mistake"
                    :value="'Ordered it by mistake'"/>
  <ReplacementInput v-model="cancelChoiceForm.cancelChoice"
                    name="I found a better product"
                    :value="'I found a better product'"/>
  <span v-if="cancelChoiceMessage.cancelChoice" class="text-red-600 text-xs px-4">{{ cancelChoiceMessage.cancelChoice }}</span>
</template>

<script setup lang="ts">
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order.forms.ts";

import ReplacementInput from "@/shared/ui/order/ReplacementInput.vue";
</script>


<style scoped>

</style>