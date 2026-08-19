<template>
  <div class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updatePhoneAccount" class="flex flex-col gap-3 w-full">
      <label>Private Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 rounded-md py-5 px-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserForm.phone type="text" inputmode="numeric" :mask="currentMask.mask"
               :key="selectedCountryCode" :placeholder="currentCountry?.placeholder"
               :class="[`w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 appearance-none`,
                     updateUserFormErrors.phoneError ? 'border border-red-500' : '']"/>
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
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/profile-actions/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { updateUserFormErrors } = userFormsErrors();
const { countries, selectedCountryCode } = usersStore();
const { updateUserForm, updateUserFormMessage } = userForms();
const { updatePhoneAccount, updateEmailAccount } = useProfile();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
</script>

<style scoped>

</style>