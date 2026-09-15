<template>
  <div class="flex flex-col gap-3">
    <CheckoutInput v-model="informationForm.addressName"
           :placeholder="'Address Name is optional'"
           :error="false" />
    <div class="flex gap-2">
      <CheckoutInput v-model="informationForm.firstName"
                     :placeholder="firstNamePlaceholder"
                     :error="informationFormErrors.firstName" />
      <CheckoutInput v-model="informationForm.lastName"
                     :placeholder="lastNamePlaceholder"
                     :error="informationFormErrors.lastName" />
    </div>
    <div class="flex flex-col gap-3">
      <CheckoutInput v-model="informationForm.country"
                     :placeholder="countryPlaceholder"
                     :error="informationFormErrors.country" />
      <CheckoutInput v-model="informationForm.stateRegion"
                     :placeholder="statePlaceholder"
                     :error="informationFormErrors.stateRegion"  />
      <CheckoutInput v-model="informationForm.address"
                     :placeholder="addressPlaceholder"
                     :error="informationFormErrors.address" />
    </div>
    <div class="flex gap-2">
      <div class="flex flex-col w-full">
        <CheckoutInput v-model="informationForm.city"
                       :placeholder="cityPlaceholder"
                       :error="informationFormErrors.city" />
      </div>
      <div class="flex flex-col w-full">
        <IMask v-model:value="informationForm.postalCode"
               :placeholder="postalCodePlaceholder"
               :class="postalCodeClass"
               :mask="postalCode.mask" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { informationForm } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";
import { useInformationFormInput } from "@/features/use-checkout-contact-info/lib/address-input.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";

import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { postalCode } = informationContactStore();
const { postalCodeClass } = informationClasses();
const {
  firstNamePlaceholder, lastNamePlaceholder, countryPlaceholder,
  statePlaceholder, addressPlaceholder, cityPlaceholder, postalCodePlaceholder
} = useInformationFormInput();
</script>
<style scoped>

</style>
