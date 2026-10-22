<template>
  <div class="flex items-center gap-3">
    <input @click="emit('closeCardForm', methods.method)"
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
  <img :src="methods.paymentImg" alt="" class="w-15">
</template>

<script setup lang="ts">
import { usePaymentMethod } from "@/entities/checkout-payment/lib/use-payment-method";
import type { PaymentMethod } from "@/entities/checkout-payment/model/payment-method.types";

const props = defineProps<{
  variant: PaymentMethod;
}>();

const emit = defineEmits<{
  closeCardForm: [method: string];
}>();

const model = defineModel<string | number>();

const { methods } = usePaymentMethod(props.variant);
</script>