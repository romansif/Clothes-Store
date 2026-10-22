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
               :class="[postalCodeClass.default,
               informationFormErrorMessages.postalCode ? postalCodeClass.default : '']"
               :mask="postalCode.mask" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { postalCode } from "@/entities/checkout-contact-info/model/information-mask";
import { postalCodeClass } from "@/entities/checkout-contact-info/model/information-form.variants";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-contact-info/model/information-form";

import CheckoutInput from "@/shared/ui/checkout-input/CheckoutInput.vue";
</script>

