<template>
  <form @keydown.enter="signIn" action="" class="mt-10">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL OR PHONE</label>
        <BaseInput v-model=loginForm.email type="email" placeholder="example@mail.com"
                   :error="loginFormErrors.emailError" variant="auth" required
                   :error-message="loginFormErrors.emailError ? loginFormMessages.emailMessage : ''" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
        </div>
        <div class="relative">
          <BaseInput v-model=loginForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
                     :error="loginFormErrors.passwordError" variant="auth" required
                     :error-message="loginFormErrors.passwordError ? loginFormMessages.passwordMessage : ''" />
          <img @click=togglePassword :src="showPassword.password ? opened : closed" alt=""
               :class="['absolute w-7.5 top-1/4 left-57 sm:left-82', loginFormErrors.passwordError ? 'top-1/6' : '']">
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">ROLE</label>
        <div class="flex gap-3">
          <div :class="signInRoleClass">
            <input v-model="loginForm.role" value="Buyer" type="radio" name="role" class="accent-black w-4 h-4 cursor-pointer">
            <span class="font-semibold">
              Buyer
            </span>
          </div>
          <div :class="signInRoleClass">
            <input v-model="loginForm.role" value="Seller" type="radio" name="role" class="accent-black w-4 h-4 cursor-pointer">
            <span class="font-semibold">
              Seller
            </span>
          </div>
        </div>
        <span v-if=loginFormErrors.roleError class="text-red-600 text-xs">{{ loginFormMessages.roleMessage }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const { signIn } = authApi();
const { signInRoleClass } = authClasses();
const { showPassword } = authStore();
const { togglePassword } = useAuth();
const { loginFormErrors } = authFormsErrors();
const { loginForm, loginFormMessages } = authForms();

import { watch } from "vue";
import { authApi } from "@/feature/auth/api/auth.api.ts";
import { authForms } from "@/feature/auth/model/auth.forms.ts";
import { useAuth } from "@/feature/auth/model/use-auth.ts";
import { authStore } from "@/entities/auth/auth.store.ts";
import { authClasses } from "@/shared/constants/auth/auth.classes.ts";
import { authFormsErrors } from "@/feature/auth/lib/auth.errors.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/BaseInput.vue";

watch(() => [loginForm.value.email, loginForm.value.password, loginForm.value.role],([email, password, role]) => {
      if(email){
        loginFormErrors.value.emailError = false;
      }
      if(password){
        loginFormErrors.value.passwordError = false;
      }
      if(role){
        loginFormErrors.value.roleError = false;
      }
    }
);
</script>

<style scoped>

</style>