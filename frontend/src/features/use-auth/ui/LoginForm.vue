<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL OR PHONE</label>
      <BaseInput v-model=loginForm.email
                 type="email"
                 placeholder="example@mail.com"
                 :error-message="loginFormErrorMessages.email || loginFormErrorMessages.password" />
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
      </div>
      <div class="relative">
        <BaseInput v-model=loginForm.password
                   :type="showPassword.password ? 'text' : 'password'"
                   placeholder="••••••••"
                   :error-message="loginFormErrorMessages.password" />
        <img @click=togglePassword
             :src="showPassword.password ? opened : closed" alt=""
             :class="['absolute w-7.5 top-1/4 left-57 sm:left-82',
             useLoginErrorMessage ? 'top-1/6' : '']">
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
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth.ts";
import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { loginForm, loginFormErrorMessages } from "@/entities/auth/model/auth.forms.ts";
import { useLoginErrorMessage } from "@/features/use-auth/lib/auth-error-messages.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/BaseInput.vue";
import LoginRoleInput from "@/shared/ui/auth/LoginRoleInput.vue";

const { showPassword } = authStore();
const { togglePassword } = toggleAuth();

refClearErrorsOnChange(
    loginForm,
    loginFormErrorMessages
)
</script>

<style scoped>

</style>