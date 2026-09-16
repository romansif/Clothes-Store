<template>
  <div class="flex font-medium flex-col gap-5 pt-5">
    <div class="flex flex-col gap-5">
      <div class="flex gap-10">
        <form @submit.prevent="updateNameAccount" class="flex flex-col gap-3 w-full">
          <label>Name</label>
          <BaseInput v-model="updateUserForm.name"
                     placeholder="New Name"
                     :error="updateUserFormErrors.name"
                     variant="confidentialityData"
                     :error-message="updateUserFormErrors.name ? updateUserFormErrorMessages.name : ''" />
          <div class="flex">
            <BaseButton type="submit" name="Save Name" variant="profileForm" />
          </div>
        </form>
        <form @submit.prevent="updateSurNameAccount" class="flex flex-col gap-3 w-full">
          <label>SurName</label>
          <BaseInput v-model="updateUserForm.surName"
                     placeholder="New SurName"
                     :error="updateUserFormErrors.surName"
                     variant="confidentialityData"
                     :error-message="updateUserFormErrors.surName ? updateUserFormErrorMessages.surName : ''" />
          <div class="flex">
            <BaseButton type="submit" name="Save SurName" variant="profileForm" />
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-col gap-10 sm:flex-row">
      <form @submit.prevent="updateEmailAccount" class="flex flex-col gap-3 w-full">
        <label>Email</label>
        <BaseInput v-model="updateUserForm.email"
                   placeholder="example@mail.com"
                   :error="updateUserFormErrors.email"
                   variant="confidentialityData"
                   :error-message="updateUserFormErrors.email ? updateUserFormErrorMessages.email : ''"/>
        <div class="flex">
          <BaseButton type="submit" name="Save Email" variant="profileForm" />
        </div>
      </form>
      <form @submit.prevent="updatePhoneAccount" class="flex flex-col gap-3 w-full">
        <label>Private Phone</label>
        <div class="flex gap-3">
          <select v-model="selectedCountryCode"
                  @change="changeCountry"
                  :class="profileSelectPhoneCodeClass">
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <IMask v-model:value="updateUserForm.phone"
                 :placeholder="currentCountry?.placeholder"
                 :class="profilePhoneClass(updateUserFormErrors.phone)"
                 :key="selectedCountryCode"
                 :mask="currentMask.mask"/>
        </div>
        <span v-if="updateUserFormErrors.phone" class="text-red-600 text-xs">
          {{ updateUserFormErrorMessages.phone }}
        </span>
        <div class="flex">
          <BaseButton type="submit" name="Save Phone" variant="profileForm" />
        </div>
      </form>
    </div>
    <div class="flex flex-col">
      <form @submit.prevent="updatePasswordAccount" class="flex flex-col">
        <div class="flex gap-10">
          <div class="flex flex-col gap-3 w-full">
            <label>Old password</label>
            <div class="relative">
              <div class="flex flex-col gap-3">
                <BaseInput v-model="updateUserForm.oldPassword"
                           :type="showOldPassword ? 'text' : 'password'"
                           :error="updateUserFormErrors.oldPassword"
                           variant="confidentialityData"
                           placeholder="Old Password"
                           :error-message="updateUserFormErrors.oldPassword ? updateUserFormErrorMessages.oldPassword : ''" />
              </div>
              <img @click.prevent="toggleOldPassword" :src="showOldPassword ? opened : closed" alt=""
                   :class="['absolute w-7.5 top-1/4 left-115', updateUserFormErrors.oldPassword ? 'top-1/6' : '']">
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label>New password</label>
            <div class="relative">
              <div class="flex flex-col gap-3">
                <BaseInput v-model="updateUserForm.newPassword"
                           :type="showNewPassword ? 'text' : 'password'"
                           :error="updateUserFormErrors.newPassword"
                           variant="confidentialityData" placeholder="New Password"
                           :error-message="updateUserFormErrors.newPassword ? updateUserFormErrorMessages.newPassword : ''"/>
              </div>
              <img @click.prevent="toggleNewPassword" :src="showNewPassword ? opened : closed" alt=""
                  :class="['absolute w-7.5 top-1/4 left-115', updateUserFormErrors.newPassword ? 'top-1/6' : '']">
            </div>
          </div>
        </div>
        <div class="flex mt-3">
          <BaseButton type="submit" name="Save Password" variant="profileForm" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { profileApi } from "@/features/use-profile-form/api/profile.api.ts";
import { profileClasses } from "@/shared/const/user/profile.classes.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { useTogglePassword } from "@/features/use-profile-form/lib/toggle-password.ts";
import {
  updateUserForm, updateUserFormErrorMessages, updateUserFormErrors
} from "@/features/use-profile-form/model/user.update.form.ts";
import { selectedCountryCode, countries } from "@/shared/lib/select-phone-form.ts";

import BaseButton  from "@/shared/ui/BaseButton.vue";
import opened from '@/assets/icons/auth/opened.png'
import closed from '@/assets/icons/auth/closed.png'
import BaseInput from "@/shared/ui/BaseInput.vue";

const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { profilePhoneClass, profileSelectPhoneCodeClass } = profileClasses();
const { toggleOldPassword, toggleNewPassword, showOldPassword, showNewPassword } = useTogglePassword()
const { updatePasswordAccount, updateNameAccount, updateSurNameAccount, updatePhoneAccount, updateEmailAccount } = profileApi();

refClearErrorsOnChange(
  updateUserForm,
  updateUserFormErrors,
  updateUserFormErrorMessages,
)
</script>


<style scoped>

</style>