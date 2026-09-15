<template>
  <template>
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
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
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";
import { useInformationFormInput } from "@/features/use-checkout-contact-info/lib/address-input.ts";
import { informationForm } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";
import { countries, selectedCountryCode } from "@/shared/lib/select-phone-form.ts";

import CheckoutInput from "@/shared/ui/CheckoutInput.vue";

const { currentMask, changeCountry } = usePhoneForm();
const { emailPlaceholder, phonePlaceholder } = useInformationFormInput();
const { informationPhoneClass, informationSelectPhoneCodeClass } = informationClasses();
</script>

<style scoped>

</style>