<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL OR PHONE</label>
      <UiInput v-model="loginForm.email"
               type="email"
               placeholder="example@mail.com"
               :error-message="useLoginErrorMessage" />
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
      </div>
      <div class="relative">
        <UiInput v-model="loginForm.password"
                 :type="showPassword.password ? 'text' : 'password'"
                 placeholder="••••••••"
                 :error-message="useLoginErrorMessage" />
        <img @click="togglePassword()"
             :src="showPassword.password ? opened : closed" alt=""
             :class="[showPasswordClass.login, loginFormErrorMessages.password ? showPasswordErrorClass : '']">
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">ROLE</label>
      <div class="flex gap-3">
        <LoginRoleInput v-model="loginForm.role"
                        :role="'Buyer'"
                        :error-message="loginFormErrorMessages.role" />
        <LoginRoleInput v-model="loginForm.role"
                        :role="'Seller'"
                        :error-message="loginFormErrorMessages.role" />
      </div>
      <span v-if=loginFormErrorMessages.role class="text-red-600 text-xs">{{ loginFormErrorMessages.role }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { togglePassword } from "@/features/toggle-password/lib/toggle-password";
import { showPassword } from "@/features/toggle-password/model/auth.refs";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { loginForm, loginFormErrorMessages } from "@/entities/auth/model/auth-form";
import { useLoginErrorMessage } from "@/features/login-auth/model/login-error-messages";
import { UiInput } from "@/shared/ui/input";
import { showPasswordClass, showPasswordErrorClass } from "@/shared/ui/auth-form/auth-form.variants";
import { LoginRoleInput } from "@/shared/ui/auth-form";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";

refClearErrorsOnChange(
    loginForm,
    loginFormErrorMessages
)
</script>
