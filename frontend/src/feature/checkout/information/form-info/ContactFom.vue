<template>
  <form class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
    <div class="flex flex-col gap-2">
      <CheckoutInput v-model="information.email" type="text" :placeholder="emailPlaceholder"
          :error="informationErrors.emailError" variant="checkoutInfo"/>
      <div class="flex gap-2">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="informationSelectPhoneCodeClass">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value="information.phone" type="tel"  :placeholder="phonePlaceholder" :class="informationPhoneClass"
               :mask="currentMask.mask" :key="selectedCountryCode">
        </IMask>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { informationClasses } from "@/shared/composables/style/checkout-style/information.classes.ts";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors";
import { checkoutPlaceholder } from "@/feature/checkout/checkout-actions/checkout.placeholder.ts";

import CheckoutInput from "@/shared/ui/base/input/CheckoutInput.vue";

const { information } = checkoutForms();
const { informationErrors } = checkoutErrors();
const { currentMask, changeCountry } = usePhoneForm();
const { countries, selectedCountryCode } = usersStore();
const { emailPlaceholder, phonePlaceholder } = checkoutPlaceholder();
const { informationPhoneClass, informationSelectPhoneCodeClass } = informationClasses();
</script>

<style scoped>

</style>