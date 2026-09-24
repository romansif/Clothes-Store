<template>
  <div class="flex flex-col gap-3">
    <div :class="shippingMethodClass(model, methods.method, errorMessage)">
      <div class="flex items-center gap-3">
        <input v-model="model"
               :value="methods.method"
               type="radio"
               class="accent-black w-4 h-4"
               name="shipping-method">
        <div class="flex flex-col gap-1">
          <span class="font-semibold">
            {{ methods.title }}
          </span>
          <span class="text-xs text-gray-500">
            {{ methods.text }}
          </span>
        </div>
      </div>
      <span class="text-sm">
        {{ methods.price }}
      </span>
    </div>
    <span v-if="errorMessage" class="text-red-500 text-xs">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { shippingClasses } from "@/shared/const/checkout/shipping.classes.ts";
import { shippingMethods } from "@/entities/checkout-shipping/config/shipping.methods.ts";
import type {ShippingValueTypes} from "@/entities/checkout-shipping/model/shipping.value.types.ts";

const props = defineProps<{
  variant: ShippingValueTypes;
  errorMessage: string;
}>();

const model = defineModel<string | number>();

const { shippingMethodClass } = shippingClasses();

const methods = computed(() => {
  return shippingMethods[props.variant];
});
</script>

<style scoped>

</style>