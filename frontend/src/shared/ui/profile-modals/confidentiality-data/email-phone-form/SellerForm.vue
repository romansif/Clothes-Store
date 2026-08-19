<template>
  <div class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updateCompanyName" class="flex flex-col gap-3 w-full">
      <label>Company Name</label>
      <BaseInput v-model=updateUserForm.companyName type="text" inputmode="numeric" placeholder="New Name"
          :error="updateUserFormErrors.companyNameError" variant="confidentialityData"
          :error-message="updateUserFormErrors.companyNameError ? updateUserFormMessage.companyNameMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateCompanyName()" name="Save Company Name" variant="profileForm" />
      </div>
    </form>
    <form @keydown.enter.prevent="updatePublicPhoneAccount" class="flex flex-col gap-3 w-full">
      <label>Public Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 rounded-md py-5 px-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserForm.publicPhone type="text" inputmode="numeric" :mask="currentMask.mask"
               :key="selectedCountryCode" :placeholder="currentCountry?.placeholder"
               :class="[`w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 appearance-none`,
                     updateUserFormErrors.publicPhoneError ? 'border border-red-500' : '']" />
      </div>
      <span v-if=updateUserFormErrors.publicPhoneError class="text-red-600 text-xs">
        {{ updateUserFormMessage.publicPhoneMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updatePublicPhoneAccount()" name="Save Phone" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/profile-actions/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { countries, selectedCountryCode } = usersStore();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateCompanyName, updatePublicPhoneAccount } = useProfile();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();
</script>

<style scoped>

</style>