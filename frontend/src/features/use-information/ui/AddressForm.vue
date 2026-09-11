<template>
  <form class="flex flex-col mt-5 gap-5">
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
      <input v-model="informationForm.addressName" type="text" placeholder="Address Name is optional" :class="addressNameClass()" />
      <div class="flex gap-2">
        <CheckoutInput v-model="informationForm.firstName" type="text" variant="checkoutInfo"
            :placeholder="firstNamePlaceholder" :error="informationFormErrors.firstNameError" />
        <CheckoutInput v-model="informationForm.lastName" type="text" variant="checkoutInfo"
            :placeholder="lastNamePlaceholder" :error="informationFormErrors.lastNameError" />
      </div>
      <div class="flex flex-col gap-3">
        <CheckoutInput v-model="informationForm.country" type="text" variant="checkoutInfo"
             :placeholder="countryPlaceholder" :error="informationFormErrors.countryError" />
        <CheckoutInput v-model="informationForm.stateRegion" type="text" variant="checkoutInfo"
            :placeholder="statePlaceholder" :error="informationFormErrors.stateRegionError"  />
        <CheckoutInput v-model="informationForm.address" type="text" :placeholder="addressPlaceholder"
            :error="informationFormErrors.addressError" variant="checkoutInfo" />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <CheckoutInput v-model="informationForm.city" type="text" variant="checkoutInfo"
            :placeholder="cityPlaceholder" :error="informationFormErrors.cityError" />
        </div>
        <div class="flex flex-col w-full">
          <IMask v-model:value="informationForm.postalCode" type="text" :placeholder="postalCodePlaceholder"
                 :class="postalCodeClass" :mask="postalCode.mask"  />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { informationForm } from "@/features/use-information/model/address.form.ts";
import { informationFormErrors } from "@/features/use-information/lib/address.errors.ts";
import { useInformationFormInput } from "@/features/use-information/lib/address-input.ts";
import { informationContactStore } from "@/features/use-information/model/address.store.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";

import CheckoutInput from "@/features/use-checkout-order/ui/CheckoutInput.vue";
import {toggleInformation} from "@/features/use-information/lib/toggle.information.ts";

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
