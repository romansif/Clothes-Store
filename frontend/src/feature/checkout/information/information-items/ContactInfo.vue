<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/usePhoneForm.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useCheckout } from "@/feature/checkout/composables/useCheckout.ts";
import { useAddCheckout } from "@/feature/checkout/composables/useAddCheckout.ts";
import { checkoutForms } from "@/shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "@/shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { information } = checkoutForms();
const { addAddress } = useAddCheckout();
const { informationErrors } = checkoutErrors();
const { currentMask, changeCountry } = usePhoneForm();
const { countries, selectedCountryCode } = usersStore();
const { emailPlaceholder, phonePlaceholder } = useCheckout();
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
    <div class="flex flex-col gap-2">
      <input v-model="information.email" type="text"
             :class="[`bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                rounded-xl outline-none px-4 py-3 text-xs`,
                  informationErrors.emailError ? `placeholder:text-red-500 border-red-400` : `placeholder:text-gray-600`]"
             :placeholder="emailPlaceholder"  />
      <div class="flex gap-2">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" class="text-xs outline-none bg-[#D9D9D9]/40 border
            border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50 rounded-xl px-2 py-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value="information.phone" type="tel" :mask="currentMask.mask" :key="selectedCountryCode"
               :class="[`bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs w-full`,
                    informationErrors.phoneError ? `placeholder:text-red-500 border-red-400` : `placeholder:text-gray-600`]"
               :placeholder="phonePlaceholder" >
        </IMask>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>