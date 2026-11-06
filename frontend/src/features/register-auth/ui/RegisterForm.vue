<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <div class="flex w-full flex-col gap-3">
        <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.name") }}</label>
        <UiInput
          v-model="registerForm.name"
          :placeholder="t('auth.placeholder.name')"
          :error-message="registerFormErrorMessages.name"
        />
      </div>
      <div class="flex w-full flex-col gap-3">
        <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.surname") }}</label>
        <UiInput
          v-model="registerForm.surName"
          :placeholder="t('auth.placeholder.surname')"
          :error-message="registerFormErrorMessages.surName"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.privatePhone") }}</label>
      <UiPhoneInput
        v-model="registerForm.phone"
        :select-class="registerSelectPhoneCode"
        :input-class="registerPhoneInputVariants"
        :error-message="registerFormErrorMessages.phone"
      />
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex w-full flex-col gap-3">
        <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.email") }}</label>
        <UiInput
          v-model="registerForm.email"
          type="email"
          :placeholder="t('auth.placeholder.email')"
          :error-message="registerFormErrorMessages.email ? registerFormErrorMessages.email : ''"
        />
      </div>
      <div class="flex w-full flex-col gap-3">
        <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.password") }}</label>
        <div class="relative">
          <UiInput
            v-model="registerForm.password"
            :type="showPassword.password ? 'text' : 'password'"
            placeholder="••••••••"
            :error-message="registerFormErrorMessages.password ? registerFormErrorMessages.password : ''"
          />
          <img
            @click="togglePassword"
            :src="showPassword.password ? opened : closed"
            alt=""
            :class="[showPasswordClass.register, registerFormErrorMessages.password ? showPasswordErrorClass : '']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { showPassword } from "@/features/toggle-password/model/auth.refs";
import { showPasswordClass, showPasswordErrorClass } from "@/shared/ui/auth-form/auth-form.variants";
import { togglePassword } from "@/features/toggle-password/lib/toggle-password.ts";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper.ts";
import { registerForm, registerFormErrorMessages } from "@/entities/register-form/model/register-from";
import {
  registerPhoneInputVariants,
  registerSelectPhoneCode,
} from "@/features/register-auth/model/register-phone-input.variants.ts";
import { UiInput } from "@/shared/ui/input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";

const { t } = useI18n();

refClearErrorsOnChange(registerForm, registerFormErrorMessages);
</script>
