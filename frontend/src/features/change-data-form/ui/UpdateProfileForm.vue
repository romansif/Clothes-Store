<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-10">
      <form class="flex flex-col gap-3 w-full"
            @submit.prevent="updateNameAccount">
        <label>Name</label>
        <UiInput v-model="updateUserForm.name"
                   placeholder="New Name"
                   variant="confidentialityData"
                   :error-message="updateUserFormErrorMessages.name" />
        <div class="flex">
          <UiButton type="submit"
                    name="Save Name"
                    variant="profileForm" />
        </div>
      </form>
      <form class="flex flex-col gap-3 w-full"
            @submit.prevent="updateSurNameAccount">
        <label>SurName</label>
        <UiInput v-model="updateUserForm.surName"
                   placeholder="New SurName"
                   variant="confidentialityData"
                   :error-message="updateUserFormErrorMessages.surName" />
        <div class="flex">
          <UiButton type="submit"
                    name="Save SurName"
                    variant="profileForm" />
        </div>
      </form>
    </div>
  </div>
  <div class="flex flex-col gap-10 sm:flex-row">
    <form class="flex flex-col gap-3 w-full"
          @submit.prevent="updateEmailAccount">
      <label>Email</label>
      <UiInput v-model="updateUserForm.email"
                 placeholder="example@mail.com"
                 variant="confidentialityData"
                 :error-message="updateUserFormErrorMessages.email" />
      <div class="flex">
        <UiButton type="submit"
                  name="Save Email"
                  variant="profileForm" />
      </div>
    </form>
    <form class="flex flex-col gap-3 w-full"
          @submit.prevent="updatePhoneAccount">
      <label>Private Phone</label>
     <UiPhoneInput v-model="updateUserForm.phone"
                 :select-class="profileFormSelectPhoneCodeClass"
                 :input-class="[profileFormPhoneInputClasses.default,
                 updateUserFormErrorMessages.phone ? profileFormPhoneInputClasses.error : '']"
                 :error-message="updateUserFormErrorMessages.phone" />
      <span v-if="updateUserFormErrorMessages.phone"
            class="text-red-600 text-xs">
          {{ updateUserFormErrorMessages.phone }}
        </span>
      <div class="flex">
        <UiButton type="submit"
                  name="Save Phone"
                  variant="profileForm" />
      </div>
    </form>
  </div>
  <div class="flex flex-col">
    <form class="flex flex-col"
          @submit.prevent="updatePasswordAccount">
      <div class="flex gap-10">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <div class="relative">
            <div class="flex flex-col gap-3">
              <UiInput v-model="updateUserForm.oldPassword"
                         :type="showOldPassword ? 'text' : 'password'"
                         variant="confidentialityData"
                         placeholder="Old Password"
                         :error-message="updateUserFormErrorMessages.oldPassword" />
            </div>
            <img @click.prevent="toggleOldPassword"
                 :src="showOldPassword ? opened : closed" alt=""
                 :class="['absolute w-7.5 top-1/4 left-115',
                 updateUserFormErrorMessages.oldPassword ? 'top-1/6' : '']">
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <div class="relative">
            <div class="flex flex-col gap-3">
              <UiInput v-model="updateUserForm.newPassword"
                         :type="showNewPassword ? 'text' : 'password'"
                         variant="confidentialityData" placeholder="New Password"
                         :error-message="updateUserFormErrorMessages.newPassword"/>
            </div>
            <img @click.prevent="toggleNewPassword"
                 :src="showNewPassword ? opened : closed" alt=""
                 :class="['absolute w-7.5 top-1/4 left-115',
                 updateUserFormErrorMessages.newPassword ? 'top-1/6' : '']">
          </div>
        </div>
      </div>
      <div class="flex mt-3">
        <UiButton type="submit"
                  name="Save Password"
                  variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { profileApi } from "@/features/change-data-form/api/update-profile";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { useTogglePassword } from "@/features/change-data-form/lib/toggle-password";
import { updateUserForm, updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import {
  profileFormPhoneInputClasses,
  profileFormSelectPhoneCodeClass
} from "@/features/change-data-form/model/profile-phone.variants";
import { UiButton } from "@/shared/ui/button";
import { UiInput } from "@/shared/ui/input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

import opened from '@/assets/icons/auth/opened.png'
import closed from '@/assets/icons/auth/closed.png'

const {
  toggleOldPassword, toggleNewPassword,
  showOldPassword, showNewPassword
} = useTogglePassword()
const {
  updatePasswordAccount, updateNameAccount, updateSurNameAccount,
  updatePhoneAccount, updateEmailAccount
} = profileApi();

refClearErrorsOnChange(
  updateUserForm,
  updateUserFormErrorMessages,
)
</script>


<style scoped>

</style>