<template>
  <input v-model="model"
         :class="[checkoutInputClasses[props.variant], props.errorMessage ? checkoutInputErrorClass : '']"
         v-bind="$attrs" />
</template>

<script setup lang="ts">
import { checkoutInputClasses, checkoutInputErrorClass } from "@/shared/ui/checkout-input/checkout-input.variants.ts";
import type { CheckoutInputProps } from "@/shared/ui/checkout-input/checkout-input.types.ts";

const props = withDefaults(defineProps<CheckoutInputProps>(), {
  variant: 'contactInfo',
});

const model = defineModel<string | number>();
</script>

<style scoped>

</style>