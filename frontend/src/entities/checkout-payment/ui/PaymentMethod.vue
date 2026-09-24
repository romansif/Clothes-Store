<template>
  <div class="flex items-center gap-3">
    <input @click="closeCardForm(methods.method)"
           v-model="model"
           type="radio"
           :value="methods.method"
           name="shipping-method"
           class="accent-black w-4 h-4" />
    <div class="flex flex-col">
      <span class="font-semibold">
        {{ methods.title }}
      </span>
      <span class="text-xs text-gray-500">
        {{ methods.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import { paymentMethods } from "@/entities/checkout-payment/config/payment.methods.ts";
import type {PaymentValueTypes} from "@/entities/checkout-payment/model/payment.value.types.ts";

const props = defineProps<{
  variant: PaymentValueTypes;
}>();

const emit = defineEmits<{
  closeCardForm: [method: string];
}>();

const closeCardForm = (method: string) => {
  emit("closeCardForm", method);
};

const model = defineModel<string | number>();

const methods = computed(() => {
  return paymentMethods[props.variant];
});
</script>

<style scoped>

</style>