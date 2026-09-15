<template>
  <div v-if="userAddresses.length > 0 && !isSavedAddress" class="flex justify-between">
    <label class="font-medium text-xs md:text-sm">
      CONTACT INFO
    </label>
    <span @click="toggleShowContact"
          class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
        Show saved contact
      </span>
  </div>
  <div class="flex flex-col gap-2">
    <CheckoutInput v-model="informationForm.email"
                   :placeholder="emailPlaceholder"
                   :error="informationFormErrors.email" />
    <div class="flex gap-2">
      <select v-model="selectedCountryCode"
              @change="changeCountry"
              :class="informationSelectPhoneCodeClass">
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
      <IMask v-model:value="informationForm.phone"
             :placeholder="phonePlaceholder"
             :class="informationPhoneClass"
             :mask="currentMask.mask"
             :key="selectedCountryCode">
      </IMask>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";
import { useInformationFormInput } from "@/features/use-checkout-contact-info/lib/address-input.ts";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { informationForm } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";
import { countries, selectedCountryCode } from "@/shared/lib/select-phone-form.ts";

import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { userAddresses } = informationContactStore();
const { currentMask, changeCountry } = usePhoneForm();
const { toggleShowContact, isSavedAddress } = toggleInformation();
const { emailPlaceholder, phonePlaceholder } = useInformationFormInput();
const { informationPhoneClass, informationSelectPhoneCodeClass } = informationClasses();
</script>

<style scoped>

</style>