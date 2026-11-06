<template>
  <div class="flex flex-col">
    <div class="flex gap-10">
      <form class="flex w-full flex-col gap-3" @submit.prevent="editUserName()">
        <label>{{ t("profile.form.name") }}</label>
        <UiInput
          v-model="updateUserForm.name"
          :placeholder="t('profile.form.newNamePh')"
          variant="confidentialityData"
          :error-message="updateUserFormErrorMessages.name"
        />
        <div class="flex">
          <UiButton type="submit" :name="t('profile.form.saveName')" variant="profileForm" />
        </div>
      </form>
      <form class="flex w-full flex-col gap-3" @submit.prevent="editUserSurName()">
        <label>{{ t("profile.form.surname") }}</label>
        <UiInput
          v-model="updateUserForm.surName"
          :placeholder="t('profile.form.newSurnamePh')"
          variant="confidentialityData"
          :error-message="updateUserFormErrorMessages.surName"
        />
        <div class="flex">
          <UiButton type="submit" :name="t('profile.form.saveSurname')" variant="profileForm" />
        </div>
      </form>
    </div>
  </div>
  <div class="flex gap-10">
    <form class="flex w-full flex-col gap-3" @submit.prevent="editUserEmail()">
      <label>{{ t("profile.form.email") }}</label>
      <UiInput
        v-model="updateUserForm.email"
        :placeholder="t('profile.form.newEmailPh')"
        variant="confidentialityData"
        :error-message="updateUserFormErrorMessages.email"
      />
      <div class="flex">
        <UiButton type="submit" :name="t('profile.form.saveEmail')" variant="profileForm" />
      </div>
    </form>
    <form class="flex w-full flex-col gap-3" @submit.prevent="editUserPhone()">
      <label>{{ t("profile.form.privatePhone") }}</label>
      <UiPhoneInput
        v-model="updateUserForm.phone"
        :select-class="profileFormSelectPhoneCodeClass"
        :input-class="[
          profileFormPhoneInputClasses.default,
          updateUserFormErrorMessages.phone ? profileFormPhoneInputClasses.error : '',
        ]"
        :error-message="updateUserFormErrorMessages.phone"
      />
      <div class="flex mt-3">
        <UiButton type="submit" :name="t('profile.form.savePhone')" variant="profileForm" />
      </div>
    </form>
  </div>
  <div class="flex flex-col">
    <form class="flex flex-col" @submit.prevent="editUserPassword()">
      <div class="flex gap-10">
        <div class="flex w-full flex-col gap-3">
          <label>{{ t("profile.form.oldPassword") }}</label>
          <div class="relative">
            <div class="flex flex-col gap-3">
              <UiInput
                v-model="updateUserForm.oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                :placeholder="t('profile.form.oldPasswordPh')"
                variant="confidentialityData"
                :error-message="updateUserFormErrorMessages.oldPassword"
              />
            </div>
            <img
              @click.prevent="toggleOldPassword"
              :src="showOldPassword ? opened : closed"
              alt=""
              :class="['absolute top-1/4 left-108 w-7.5', updateUserFormErrorMessages.oldPassword ? 'top-1/6' : '']"
            />
          </div>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label>{{ t("profile.form.newPassword") }}</label>
          <div class="relative">
            <div class="flex flex-col gap-3">
              <UiInput
                v-model="updateUserForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                :placeholder="t('profile.form.newPasswordPh')"
                variant="confidentialityData"
                :error-message="updateUserFormErrorMessages.newPassword"
              />
            </div>
            <img
              @click.prevent="toggleNewPassword"
              :src="showNewPassword ? opened : closed"
              alt=""
              :class="['absolute top-1/4 left-108 w-7.5', updateUserFormErrorMessages.newPassword ? 'top-1/6' : '']"
            />
          </div>
        </div>
      </div>
      <div class="mt-3 flex">
        <UiButton type="submit" :name="t('profile.form.savePassword')" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { useTogglePassword } from "@/features/change-user-data-form/lib/toggle-password";
import {
  useEditUserName,
  useEditUserSurName,
  useEditUserEmail,
  useEditUserPhone,
  useEditUserPassword,
} from "@/features/change-user-data-form/lib/use-edit-user-data";
import { updateUserForm, updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import {
  profileFormPhoneInputClasses,
  profileFormSelectPhoneCodeClass,
} from "@/features/change-user-data-form/model/profile-phone.variants";
import { UiButton } from "@/shared/ui/button";
import { UiInput } from "@/shared/ui/input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

import opened from "@/assets/icons/auth/opened.png";
import closed from "@/assets/icons/auth/closed.png";

const { t } = useI18n();
const { editUserName } = useEditUserName();
const { editUserPhone } = useEditUserPhone();
const { editUserEmail } = useEditUserEmail();
const { editUserSurName } = useEditUserSurName();
const { editUserPassword } = useEditUserPassword();
const { toggleOldPassword, toggleNewPassword, showOldPassword, showNewPassword } = useTogglePassword();

refClearErrorsOnChange(updateUserForm, updateUserFormErrorMessages);
</script>
