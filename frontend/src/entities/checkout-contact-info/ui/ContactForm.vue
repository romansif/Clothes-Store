<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <CheckoutInput v-model="informationForm.firstName"
                     placeholder="FirstName"
                     :error-message="informationFormErrorMessages.firstName" />
      <CheckoutInput v-model="informationForm.lastName"
                     placeholder="LastName"
                     :error-message="informationFormErrorMessages.lastName" />
    </div>
    <CheckoutInput v-model="informationForm.email"
                   placeholder="example@gmail.com"
                   :error-message="informationFormErrorMessages.email" />
    <div class="flex gap-2">
      <select v-model="selectedCountryCode"
              @change="changeCountry"
              :class="informationSelectPhoneCodeClass">
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
      <IMask v-model:value="informationForm.phone"
             :placeholder="currentCountry?.placeholder"
             :class="informationPhoneClass(informationFormErrorMessages.phone)"
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
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-contact-info/model/address.form.ts";
import { countries, selectedCountryCode } from "@/shared/lib/select-phone-form.ts";

import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { currentMask, currentCountry, changeCountry } = usePhoneForm();
const { informationPhoneClass, informationSelectPhoneCodeClass } = informationClasses();
</script>

<style scoped>

</style>