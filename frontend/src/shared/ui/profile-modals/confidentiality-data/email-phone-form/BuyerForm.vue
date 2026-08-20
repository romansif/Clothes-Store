<template>
  <div class="flex flex-col gap-10 sm:flex-row">
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
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-full">
      <label>Email</label>
      <BaseInput v-model=updateUserForm.email type="text" inputmode="numeric" placeholder="example@mail.com"
          :error="updateUserFormErrors.emailError" variant="confidentialityData" reqiured
          :error-message="updateUserFormErrors.emailError ? updateUserFormMessage.emailMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { updateUserFormErrors } = userFormsErrors();
const { countries, selectedCountryCode } = usersStore();
const { updateUserForm, updateUserFormMessage } = userForms();
const { updatePhoneAccount, updateEmailAccount } = useProfile();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { profilePhoneClass, profileSelectPhoneCodeClass } = profileClasses();

import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { profileClasses } from "@/shared/composables/style/profile.classes.ts";
import { useProfile } from "@/feature/profile/profile-actions/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";
</script>

<style scoped>

</style>