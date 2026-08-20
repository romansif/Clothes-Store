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
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="profileSelectPhoneCodeClass">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserForm.publicPhone type="text" inputmode="numeric" :placeholder="currentCountry?.placeholder"
               :class="profilePhoneClass(updateUserFormErrors.publicPhoneError)" :key="selectedCountryCode" :mask="currentMask.mask" />
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
const { profileSelectPhoneCodeClass, profilePhoneClass } = profileClasses();
const { countries, selectedCountryCode } = usersStore();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateCompanyName, updatePublicPhoneAccount } = useProfile();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();

import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/profile-actions/use.profile.ts";
import {profileClasses} from "@/shared/composables/style/profile.classes.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";
</script>

<style scoped>

</style>