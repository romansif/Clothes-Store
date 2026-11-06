<template>
  <div :class="paymentMethodClass(model, props.payment.method, props.error)">
    <label class="flex cursor-pointer items-center gap-3">
      <input
        v-model="model"
        type="radio"
        :value="props.payment.method"
        name="payment-method"
        class="h-4 w-4 accent-black"
        @change="emit('select', props.payment.method)"
      />
      <div class="flex flex-col">
        <span class="font-semibold">{{ t(props.payment.title) }}</span>
        <span class="text-xs text-gray-500">{{ t(props.payment.text) }}</span>
      </div>
    </label>
    <img :src="props.payment.paymentImg" alt="" class="w-15" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { paymentMethodClass } from "@/shared/model/payment-form.variants";
import type { PaymentMethodDescriptionProps, PaymentMethods } from "@/entities/checkout-payment-form";

const props = defineProps<{
  payment: PaymentMethodDescriptionProps;
  error: string;
}>();

const emit = defineEmits<{
  select: [method: PaymentMethods];
}>();

const model = defineModel<PaymentMethods | "">({
  required: true,
});

const { t } = useI18n();
</script>
