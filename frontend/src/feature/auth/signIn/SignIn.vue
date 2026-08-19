<script setup lang="ts">
import { watch } from "vue";
import { auth } from "../auth-composables/auth.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { toggleAuth } from "@/feature/auth/auth-composables/toggleAuth.ts";
import { authStore } from "@/shared/composables/stores/auth.store.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";

import closed from "@/app/assets/icons/auth/closed.png";
import opened from "@/app/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { signIn } = auth();
const { showPassword } = authStore();
const { loginFormErrors } = authFormsErrors();
const { loginForm, loginFormMessages } = authForms();
const { togglePassword } = toggleAuth();

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

<template>
  <form @keydown.enter="signIn" action="" class="mt-10">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL OR PHONE</label>
        <BaseInput v-model=loginForm.email type="email" placeholder="example@mail.com, " :error="loginFormErrors.emailError"
                   :error-message="loginFormErrors.emailError ? loginFormMessages.emailMessage : ''" variant="auth" required />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
        </div>
        <div class="relative">
          <BaseInput v-model=loginForm.password :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                     :error="loginFormErrors.passwordError" variant="auth" required
                     :error-message="loginFormErrors.passwordError ? loginFormMessages.passwordMessage : ''" />
          <img @click=togglePassword :src="showPassword.password ? opened : closed" alt=""
               :class="['absolute w-7.5 top-1/4 left-57 sm:left-82', loginFormErrors.passwordError ? 'top-1/6' : '']">
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">ROLE</label>
        <div class="flex gap-3">
          <div :class="[`flex items-center gap-3 bg-[#D9D9D9]/40  outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
                       loginFormErrors.roleError ? 'border border-red-500' : '']">
            <input v-model="loginForm.role" value="Buyer" type="radio" name="role" class="accent-black w-4 h-4 cursor-pointer">
            <span class="font-semibold">
                  Buyer
                </span>
          </div>
          <div :class="[`flex items-center gap-3 bg-[#D9D9D9]/40  outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
                       loginFormErrors.roleError ? 'border border-red-500' : '']">
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

<style scoped>

</style>