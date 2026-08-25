<template>
  <div class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updateCompanyName" class="flex flex-col gap-3 w-full">
      <label>Company Name</label>
      <BaseInput v-model="updateUserForm.companyName" type="text" inputmode="numeric" placeholder="New Name"
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
        <IMask v-model:value="updateUserForm.publicPhone" type="text" inputmode="numeric" :placeholder="currentCountry?.placeholder"
               :class="profilePhoneClass(updateUserFormErrors.publicPhoneError)" :key="selectedCountryCode" :mask="currentMask.mask" />
      </div>
      <span v-if="updateUserFormErrors.publicPhoneError" class="text-red-600 text-xs">
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
const { countries, selectedCountryCode } = userStore();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateCompanyName, updatePublicPhoneAccount } = profileApi();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();

import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { userForms } from "@/features/use-profile/model/user.form.ts";
import { profileApi } from "@/features/use-profile/api/profile.api.ts";
import { profileClasses } from "@/shared/constants/user/profile.classes.ts";
import { userFormsErrors } from "@/features/use-profile/lib/users.error.ts";

import BaseButton  from "@/shared/ui/BaseButton.vue";
import BaseInput from "@/shared/ui/BaseInput.vue";
</script>

<style scoped>

</style>