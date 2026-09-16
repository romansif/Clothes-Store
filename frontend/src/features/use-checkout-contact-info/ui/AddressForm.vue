<template>
  <label class="font-medium text-xs md:text-sm">
    SHIPPING ADDRESS
  </label>
  <div class="flex flex-col gap-3">
    <CheckoutInput v-model="informationForm.addressName"
           placeholder="Address Name is optional" />
    <div class="flex flex-col gap-3">
      <CheckoutInput v-model="informationForm.country"
                     placeholder="Country"
                     :error-message="informationFormErrorMessages.country" />
      <CheckoutInput v-model="informationForm.stateRegion"
                     placeholder="State/Region"
                     :error-message="informationFormErrorMessages.stateRegion"  />
      <CheckoutInput v-model="informationForm.address"
                     placeholder="Address"
                     :error-message="informationFormErrorMessages.address" />
    </div>
    <div class="flex gap-2">
      <div class="flex flex-col w-full">
        <CheckoutInput v-model="informationForm.city"
                       placeholder="City"
                       :error-message="informationFormErrorMessages.city" />
      </div>
      <div class="flex flex-col w-full">
        <IMask v-model:value="informationForm.postalCode"
               placeholder="Postal Code"
               :class="postalCodeClass"
               :mask="postalCode.mask" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { informationForm, informationFormErrorMessages } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";

import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { postalCode } = informationContactStore();
const { postalCodeClass } = informationClasses();
</script>
<style scoped>

</style>
