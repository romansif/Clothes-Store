<script setup lang="ts">
import { useAddProfile } from "../../../profile/profile-composables/useAddProfile.ts";
import { checkoutForms } from "../../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "../../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";
import { useCheckout } from "../../composables/useCheckout.ts";

const { addAddress } = useAddProfile();
const { information } = checkoutForms();
const { informationErrors } = checkoutErrors();
const { firstNamePlaceholder, lastNamePlaceholder, countryPlaceholder, statePlaceholder,
  cityPlaceholder, addressPlaceholder, postalCodePlaceholder } = useCheckout();
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">SHIPPING ADDRESS</label>
    <div class="flex flex-col gap-3">
      <input v-model="information.addressName" type="text"
             class="bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                rounded-xl outline-none px-4 py-3 text-xs placeholder:text-gray-600"
             placeholder="Address Name is optional"  />
      <div class="flex gap-2">
        <input v-model="information.firstName" type="text"
               :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
                    informationErrors.firstNameError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="firstNamePlaceholder"  />
        <input v-model="information.lastName" type="text"
               :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
                    informationErrors.lastNameError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="lastNamePlaceholder"  />
      </div>
      <div class="flex flex-col gap-3">
        <input v-model="information.country" type="text"
               :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.countryError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="countryPlaceholder"  />
        <input v-model="information.stateRegion" type="text"
               :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.stateRegionError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="statePlaceholder"  />
        <input v-model="information.address" type="text"
               :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.addressError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="addressPlaceholder"  />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <input v-model="information.city" type="text"
                 :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.cityError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
                 :placeholder="cityPlaceholder"  />
        </div>
        <div class="flex flex-col w-full">
          <input v-model="information.postalCode" type="text"
                 :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.postalCodeError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
                 :placeholder="postalCodePlaceholder" />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>