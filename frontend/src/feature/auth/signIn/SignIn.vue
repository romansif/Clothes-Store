<script setup lang="ts">
import { watch } from "vue";
import { useAuth } from "../auth-composables/use.auth.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { toggleAuth } from "@/feature/auth/auth-composables/toggleAuth.ts";
import { authStore } from "@/shared/composables/stores/auth.store.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";


import closed from "@/app/assets/icons/auth/closed.png";
import opened from "@/app/assets/icons/auth/opened.png";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import maki_arrow from "@/app/assets/icons/arrows/right-short-arrow.svg";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";
import GoogleSignIn from "@/feature/auth/signIn/GoogleSignIn.vue";

const { signIn } = useAuth();
const { showPassword, showSignInSection } = authStore();
const { togglePassword, toggleSignIn } = toggleAuth();
const { clearLoginForm } = clearAuthForms();
const { loginFormErrors } = authFormsErrors();
const { loginForm, loginFormMessages } = authForms();

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
  <section v-if="showSignInSection.section === false" class="font-[Montserrat] fixed inset-0 flex items-center justify-center">
    <div class="w-87.5 sm:w-112.5 rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-58.75 sm:w-68.75">
          <div class="font-medium flex items-center justify-between">
            <span class="cursor-pointer transition duration-400 hover:scale-120">SIGN IN</span>
            <router-link :to="{ name: 'signUp'}" @click=clearLoginForm class="transition duration-400 hover:scale-110">
              <span class="text-[#A3A3A3]">SIGN UP</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
      <form @keydown.enter="signIn" action="" class="mt-10">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
            <BaseInput v-model=loginForm.email type="email" placeholder="example@mail.com" :error="loginFormErrors.emailError"
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
              <img @click=togglePassword :src="showPassword ? opened : closed" alt=""
                   :class="['absolute w-[30px] top-1/4 left-57 sm:left-82', loginFormErrors.passwordError ? 'top-1/6' : '']">
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">ROLE</label>
            <div class="flex gap-3">
              <div :class="[`flex items-center gap-3 bg-[#D9D9D9]/40  outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 focus:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
                       loginFormErrors.roleError ? 'border border-red-500' : '']">
                <input v-model="loginForm.role" value="Buyer" type="radio" name="role" class="accent-black w-4 h-4 cursor-pointer">
                <span class="font-semibold">
                  Buyer
                </span>
              </div>
              <div :class="[`flex items-center gap-3 bg-[#D9D9D9]/40  outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 focus:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
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
      <div class="relative duration-400 hover:scale-105 cursor-pointer">
        <BaseButton @click="signIn" name="SIGN IN" variant="login" />
        <img :src=maki_arrow alt="" class="absolute w-[25px] top-9.5 left-58 sm:left-83 ">
      </div>
      <div class="flex flex-col items-center gap-3 mt-3 ">
        <GoogleSignIn class="duration-400 hover:scale-105 cursor-pointer"/>
        <BaseButton @click="toggleSignIn" name="Sign in using your phone" variant="changeRegister" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>