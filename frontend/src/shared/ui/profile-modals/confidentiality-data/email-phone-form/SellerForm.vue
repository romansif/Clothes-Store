<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";

import { usersStore } from "../../../../composables/stores/users.store.ts";
import { userForms } from "../../../../composables/forms-composables/forms/users.forms.ts";
import { usePhoneForm } from "../../../../../feature/auth/auth-composables/usePhoneForm.ts";
import { useUpdateProfile } from "../../../../../feature/profile/profile-composables/useUpdateProfile.ts";
import { userFormsErrors } from "../../../../composables/forms-composables/forms-errors/users.errors.ts";

import BaseButton  from "../../../button/BaseButton.vue";

const { user } = usersStore();
const { countries, selectedCountryCode } = usersStore();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateCompanyName, updatePublicPhoneAccount } = useUpdateProfile();
const { updateUserCompanyName, updateUserFormCompanyNameMessage,
  updateUserFormPublicPhone, updateUserFormPublicPhoneMessage} = userForms();
const { updateUserFormPublicPhoneErrors, updateUserFormCompanyNameErrors } = userFormsErrors();
</script>

<template>
  <div v-if="user.role === 'Seller'" class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updateCompanyName" class="flex flex-col gap-3 w-full">
      <label for="">Company Name</label>
      <input v-model=updateUserCompanyName.companyName type="text" inputmode="numeric"
             class="border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="New Name"/>
      <span v-if=updateUserFormCompanyNameErrors.companyNameError class="text-red-600 text-xs">
        {{ updateUserFormCompanyNameMessage.companyNameMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updateCompanyName()" name="Save Company Name" variant="profileForm" />
      </div>
    </form>
    <form @keydown.enter.prevent="updatePublicPhoneAccount" class="flex flex-col gap-3 w-full">
      <label for="">Public Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 focus:bg-gray-50 rounded-md py-5 px-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserFormPublicPhone.publicPhone type="text" inputmode="numeric" :mask="currentMask.mask" :key="selectedCountryCode"
               class="w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" :placeholder="currentCountry?.placeholder"/>
      </div>
      <span v-if=updateUserFormPublicPhoneErrors.publicPhoneError class="text-red-600 text-xs">
        {{ updateUserFormPublicPhoneMessage.publicPhoneMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updatePublicPhoneAccount()" name="Save Phone" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>