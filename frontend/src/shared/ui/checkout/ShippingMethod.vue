<template>
  <div class="flex flex-col gap-3">
    <div :class="shippingMethodClass(method)">
      <div class="flex items-center gap-3">
        <input v-model="shippingForm.delivery" :value="method" type="radio"
               class="accent-black w-4 h-4" name="shipping-method">
        <div class="flex flex-col gap-1">
            <span class="font-semibold">
              {{ title }}
            </span>
          <span class="text-xs text-gray-500">
            {{ text }}
          </span>
        </div>
      </div>
      <span class="text-sm">
        {{ price }}
      </span>
    </div>
    <span v-if="shippingFormError.delivery" class="text-red-500 text-xs">
      {{ shippingFormErrorMessage.delivery }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { shippingClasses } from "@/shared/const/checkout/shipping.classes.ts";
import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";

defineProps<{
  method: string;
  title: string;
  text: string;
  price: string;
}>();

const { shippingMethodClass } = shippingClasses();
</script>

<style scoped>

</style>