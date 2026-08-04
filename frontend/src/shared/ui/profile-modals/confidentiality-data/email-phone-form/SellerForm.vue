<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/composables/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { user } = usersStore();
const { countries, selectedCountryCode } = usersStore();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateCompanyName, updatePublicPhoneAccount } = useProfile();
const { updateUserFormPublicPhoneErrors, updateUserFormCompanyNameErrors } = userFormsErrors();
const {
  updateUserCompanyName, updateUserFormCompanyNameMessage,
  updateUserPublicPhone, updateUserFormPublicPhoneMessage
} = userForms();
</script>

<template>
  <div v-if="user.role === 'Seller'" class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updateCompanyName" class="flex flex-col gap-3 w-full">
      <label>Company Name</label>
      <BaseInput v-model=updateUserCompanyName.companyName type="text" inputmode="numeric" placeholder="New Name"
          :error="updateUserFormCompanyNameErrors.companyNameError" variant="confidentialityData"
          :error-message="updateUserFormCompanyNameErrors.companyNameError ? updateUserFormCompanyNameMessage.companyNameMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateCompanyName()" name="Save Company Name" variant="profileForm" />
      </div>
    </form>
    <form @keydown.enter.prevent="updatePublicPhoneAccount" class="flex flex-col gap-3 w-full">
      <label>Public Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 focus:bg-gray-50 rounded-md py-5 px-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserPublicPhone.publicPhone type="text" inputmode="numeric" :mask="currentMask.mask"
               :key="selectedCountryCode" :placeholder="currentCountry?.placeholder"
               class="w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" />
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