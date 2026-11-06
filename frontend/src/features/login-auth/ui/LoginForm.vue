<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3">
      <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.emailOrPhone") }}</label>
      <UiInput
        v-model="loginForm.email"
        type="email"
        :placeholder="t('auth.placeholder.name')"
        :error-message="useLoginErrorMessage"
      />
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex">
        <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.password") }}</label>
        <label class="ml-auto text-xs text-gray-400">{{ t("auth.forgotPassword") }}</label>
      </div>
      <div class="relative">
        <UiInput
          v-model="loginForm.password"
          :type="showPassword.password ? 'text' : 'password'"
          placeholder="••••••••"
          :error-message="useLoginErrorMessage"
        />
        <img
          @click="togglePassword"
          :src="showPassword.password ? opened : closed"
          alt=""
          :class="[showPasswordClass.login, loginFormErrorMessages.password ? showPasswordErrorClass : '']"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="text-xs font-semibold tracking-wider text-gray-700 uppercase">{{ t("auth.role") }}</label>
      <div class="flex gap-3">
        <LoginRoleInput
          v-model="loginForm.role"
          :value="'Buyer'"
          :role="t('roles.buyer')"
          :error-message="loginFormErrorMessages.role"
        />
        <LoginRoleInput
          v-model="loginForm.role"
          :value="'Seller'"
          :role="t('roles.seller')"
          :error-message="loginFormErrorMessages.role"
        />
      </div>
      <span v-if="loginFormErrorMessages.role" class="text-xs text-red-600">{{ loginFormErrorMessages.role }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { togglePassword } from "@/features/toggle-password/lib/toggle-password";
import { showPassword } from "@/features/toggle-password/model/auth.refs";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { loginForm, loginFormErrorMessages } from "@/entities/login-form/model/login-form";
import { useLoginErrorMessage } from "@/features/login-auth/model/login-error-messages";
import { UiInput } from "@/shared/ui/input";
import { showPasswordClass, showPasswordErrorClass } from "@/shared/ui/auth-form/auth-form.variants";
import { LoginRoleInput } from "@/shared/ui/auth-form";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";

const { t } = useI18n();

refClearErrorsOnChange(loginForm, loginFormErrorMessages);
</script>
