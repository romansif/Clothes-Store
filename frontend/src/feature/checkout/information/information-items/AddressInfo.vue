<script setup lang="ts">
import { useProfile } from "../../../profile/profile-composables/useProfile.ts";
import { checkoutForms } from "../../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "../../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { addAddress } = useProfile();
const { informationErrors } = checkoutErrors();
const { information, informationMessages } = checkoutForms();
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">SHIPPING ADDRESS</label>
    <div class="flex flex-col gap-3">
      <div class="flex gap-2">
        <input v-model="information.firstName" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.firstNameError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
               :placeholder="informationMessages.firstNameMessage"  />
        <input v-model="information.lastName" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.lastNameError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
               :placeholder="informationMessages.lastNameMessage"  />
      </div>
      <div class="flex flex-col gap-3">
        <input v-model="information.country" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.countryError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
               :placeholder="informationMessages.countryMessage"  />
        <input v-model="information.stateRegion" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.stateRegionError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
               :placeholder="informationMessages.stateRegionMessage"  />
        <input v-model="information.address" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.addressError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
               :placeholder="informationMessages.addressMessage"  />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <input v-model="information.city" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.cityError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
                 :placeholder="informationMessages.cityMessage"  />
        </div>
        <div class="flex flex-col w-full">
          <input v-model="information.postalCode" type="text" :class="['w-full bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
            informationErrors.postalCodeError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
                 :placeholder="informationMessages.postalCodeMessage"  />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>