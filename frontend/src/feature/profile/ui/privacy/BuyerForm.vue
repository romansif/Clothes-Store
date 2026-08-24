<template>
  <div class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-full">
      <label>Email</label>
      <BaseInput v-model=updateUserForm.email type="text" inputmode="numeric" placeholder="example@mail.com"
          :error="updateUserFormErrors.emailError" variant="confidentialityData" reqiured
          :error-message="updateUserFormErrors.emailError ? updateUserFormMessage.emailMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
      </div>
    </form>
    <form @keydown.enter.prevent="updatePhoneAccount" class="flex flex-col gap-3 w-full">
      <label>Private Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="profileSelectPhoneCodeClass">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserForm.phone type="text" inputmode="numeric" :placeholder="currentCountry?.placeholder"
               :class="profilePhoneClass(updateUserFormErrors.phoneError)" :key="selectedCountryCode" :mask="currentMask.mask"/>
      </div>
      <span v-if=updateUserFormErrors.phoneError class="text-red-600 text-xs">
        {{ updateUserFormMessage.phoneMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updatePhoneAccount()" name="Save Phone" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { updateUserFormErrors } = userFormsErrors();
const { countries, selectedCountryCode } = userStore();
const { updateUserForm, updateUserFormMessage } = userForms();
const { updatePhoneAccount, updateEmailAccount } = profileApi();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { profilePhoneClass, profileSelectPhoneCodeClass } = profileClasses();

import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { userStore } from "@/feature/profile/model/user.store.ts";
import { userForms } from "@/feature/profile/model/user.form.ts";
import { profileClasses } from "@/shared/constants/user/profile.classes.ts";
import { profileApi } from "@/feature/profile/api/profile.api.ts";
import { userFormsErrors } from "@/feature/profile/lib/users.error.ts";

import BaseButton  from "@/shared/ui/BaseButton.vue";
import BaseInput from "@/shared/ui/BaseInput.vue";
</script>

<style scoped>

</style>