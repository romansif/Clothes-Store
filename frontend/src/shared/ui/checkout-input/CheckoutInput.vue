<template>
  <input
    v-model="model"
    :class="[CHECKOUT_INPUT_CLASS[props.variant], props.errorMessage ? CHECKOUT_INPUT_ERROR_CLASS : '']"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import {
  CHECKOUT_INPUT_CLASS, CHECKOUT_INPUT_ERROR_CLASS,
} from "@/shared/ui/checkout-input/checkout-input.variants";
import type { CheckoutInputProps } from "@/shared/ui/checkout-input";

const props = withDefaults(defineProps<CheckoutInputProps>(), {
  variant: "contactInfo",
});

const model = defineModel<string | number>();
</script>
