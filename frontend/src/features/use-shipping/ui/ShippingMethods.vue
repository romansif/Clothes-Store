<template>
  <div class="flex flex-col mt-8 gap-5">
    <label class="font-medium text-xs md:text-sm">
      SHIPPING METHODS
    </label>
    <div class="flex gap-3">
      <form action="" class="flex flex-col gap-6 w-full">
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
          <span v-if="shippingFormError.deliveryError" class="text-red-500 text-xs">
            {{ shippingFormErrorMessage.deliveryMessage }}
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
          <span v-if="shippingFormError.deliveryError" class="text-red-500 text-xs">
            {{ shippingFormErrorMessage.deliveryMessage }}
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shippingForm, shippingFormErrorMessage } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";
import { shippingClasses } from "@/shared/const/checkout/shipping.classes.ts";

const { shippingMethodClass } = shippingClasses();
</script>

<style scoped>

</style>