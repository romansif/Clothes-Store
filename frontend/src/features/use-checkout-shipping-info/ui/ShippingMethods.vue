<template>
  <div>
    <div :class="shippingMethodClass('standard')">
      <div class="flex items-center gap-3">
        <input v-model="shippingForm.delivery" value="standard" type="radio"
               class="accent-black w-4 h-4" name="shipping-method">
        <div class="flex flex-col">
                <span class="font-semibold">
                  STANDARD SHIPPING
                </span>
          <span class="text-xs text-gray-500">
                  Delivery in 3-5 business days
                </span>
        </div>
      </div>
      <span class="text-sm">
              Free
            </span>
    </div>
    <span v-if="shippingFormError.delivery" class="text-red-500 text-xs">
            {{ shippingFormErrorMessage.delivery }}
          </span>
  </div>
  <div>
    <div :class="shippingMethodClass('express')">
      <div class="flex items-center gap-3">
        <input v-model="shippingForm.delivery" value="express" type="radio"
               class="accent-black w-4 h-4" name="shipping-method">
        <div class="flex flex-col">
                <span class="font-semibold">
                  EXPRESS COURIER
                </span>
          <span class="text-xs text-gray-500">
                  Delivery tomorrow morning
                </span>
        </div>
      </div>
      <span class="text-sm">
              $15.00
            </span>
    </div>
    <span v-if="shippingFormError.delivery" class="text-red-500 text-xs">
            {{ shippingFormErrorMessage.delivery }}
          </span>
  </div>
</template>

<script setup lang="ts">
import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";
import { shippingClasses } from "@/shared/const/checkout/shipping.classes.ts";

const { shippingMethodClass } = shippingClasses();
</script>

<style scoped>

</style>