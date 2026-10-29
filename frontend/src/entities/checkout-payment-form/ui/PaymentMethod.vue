<template>
    <div :class="paymentMethodClass(model, payment.method, error)">
        <label class="flex cursor-pointer items-center gap-3">
            <input
                v-model="model"
                type="radio"
                :value="payment.method"
                name="payment-method"
                class="h-4 w-4 accent-black"
                @change="emit('select', payment.method)"
            />
            <div class="flex flex-col">
                <span class="font-semibold">{{ payment.title }}</span>
                <span class="text-xs text-gray-500">{{ payment.text }}</span>
            </div>
        </label>
        <img :src="payment.paymentImg" alt="" class="w-15" />
    </div>
</template>

<script setup lang="ts">
import { paymentMethodClass } from "@/shared/model/payment-form.variants";
import type {
    PaymentMethodDescriptionProps,
    PaymentMethods,
} from "@/entities/checkout-payment-form";

defineProps<{
    payment: PaymentMethodDescriptionProps;
    error: string;
}>();

const emit = defineEmits<{
    select: [method: PaymentMethods];
}>();

const model = defineModel<PaymentMethods | "">({
    required: true,
});
</script>
