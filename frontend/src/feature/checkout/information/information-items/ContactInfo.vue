<script setup lang="ts">
import { computed } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { usersStore } from "../../../../shared/composables/stores/users.store.ts";
import { useAddProfile } from "../../../profile/profile-composables/useAddProfile.ts";
import { checkoutForms } from "../../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "../../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";
import { usePhoneForm } from "../../../auth/auth-composables/usePhoneForm.ts";

const { addAddress } = useAddProfile();
const { informationErrors } = checkoutErrors();
const { information, informationMessages} = checkoutForms();
const { userAddress, countries, selectedCountryCode } = usersStore();
const { currentMask, currentCountry, changeCountry } = usePhoneForm();


const emailPlaceholder = computed(() => {
  if(informationErrors.value.emailError){
    return informationMessages.value.emailMessage;
  }
  if(userAddress.value.email){
    return userAddress.value.email;
  }
  return informationMessages.value.emailMessage = 'example@gmail.com';
})

const phonePlaceholder = computed(() => {
  if(informationErrors.value.phoneError){
    return informationMessages.value.phoneMessage;
  }
  if(userAddress.value.phone){
    return userAddress.value.phone;
  }
  return informationMessages.value.phoneMessage = currentCountry.value?.placeholder ?? '';
})
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
    <div class="flex flex-col gap-2">
      <input v-model="information.email" type="text"
             :class="[`bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                rounded-xl outline-none px-4 py-3 text-xs`,
                  informationErrors.emailError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
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
                    informationErrors.phoneError ? `placeholder:text-red-500 border-red-300` : `placeholder:text-gray-600`]"
               :placeholder="phonePlaceholder" >
        </IMask>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>