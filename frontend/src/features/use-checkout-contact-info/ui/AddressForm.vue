<template>
  <div class="flex justify-between">
    <label class="font-medium text-xs md:text-sm">
      SHIPPING ADDRESS
    </label>
    <span v-if="userAddresses.length > 0" @click="toggleShowContact"
          class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
        Show saved contact
      </span>
  </div>
  <div class="flex flex-col gap-3">
    <input v-model="informationForm.addressName"
           type="text"
           placeholder="Address Name is optional"
           :class="addressNameClass()" />
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
               :mask="postalCode.mask"  />
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
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle.information.ts";

import CheckoutInput from "@/shared/ui/CheckoutInput.vue";

const { toggleShowContact } = toggleInformation();
const { postalCode, userAddresses } = informationContactStore()
const { addressNameClass, postalCodeClass } = informationClasses();
const {
  firstNamePlaceholder, lastNamePlaceholder, countryPlaceholder,
  statePlaceholder, addressPlaceholder, cityPlaceholder, postalCodePlaceholder
} = useInformationFormInput();
</script>
<style scoped>

</style>
