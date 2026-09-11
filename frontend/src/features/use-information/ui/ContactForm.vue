<template>
  <form class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
    <div class="flex flex-col gap-2">
      <CheckoutInput v-model="information.email" type="text" :placeholder="emailPlaceholder"
          :error="informationFormErrors.emailError" variant="checkoutInfo"/>
      <div class="flex gap-2">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="informationSelectPhoneCodeClass">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value="information.phone" type="tel" :placeholder="phonePlaceholder" :class="informationPhoneClass"
               :mask="currentMask.mask" :key="selectedCountryCode">
        </IMask>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";
import { useInformationFormInput } from "@/features/use-information/lib/address-input.ts";
import { informationFormErrors } from "@/features/use-information/lib/address.errors.ts";

import CheckoutInput from "@/features/use-checkout-order/ui/CheckoutInput.vue";

const { information } = checkoutForm();
const { currentMask, changeCountry } = usePhoneForm();
const { countries, selectedCountryCode } = userStore();
const { emailPlaceholder, phonePlaceholder } = useInformationFormInput();
const { informationPhoneClass, informationSelectPhoneCodeClass } = informationClasses();
</script>

<style scoped>

</style>