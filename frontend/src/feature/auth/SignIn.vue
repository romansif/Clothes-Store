<script setup lang="ts">
import { watch, ref } from "vue";
import { useAuth } from "./auth-composables/useAuth.ts";
import { authForms } from "../../shared/composables/forms-composables/forms/auth.forms.ts";
import { authFormsErrors } from "../../shared/composables/forms-composables/forms-errors/auth.errors.ts";
import { clearAuthForms } from "../../shared/composables/forms-composables/clear-forms/clear.auth.ts";

import closed from "../../app/assets/icons/auth/closed.png";
import opened from "../../app/assets/icons/auth/opened.png";
import maki_arrow from "../../app/assets/icons/arrows/maki--arrow.svg";
import BaseButton from "../../shared/ui/button/BaseButton.vue";

const { signIn } = useAuth();
const { clearLoginForm } = clearAuthForms()
const { loginFormErrors } = authFormsErrors()
const { loginForm, loginFormMessages } = authForms()

watch(() => [loginForm.value.email, loginForm.value.password],([email, password]) => {
      if(email){
        loginFormErrors.value.emailError = false
      }
      if(password){
        loginFormErrors.value.passwordError = false
      }
    }
)

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <section class="font-[Montserrat] fixed inset-0 flex items-center justify-center">
    <div class="bg-white w-[350px] sm:w-[450px] shadow-xl rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-[235px] sm:w-[275px]">
          <div class="font-medium flex items-center justify-between">
            <span class="">SIGN IN</span>
            <router-link :to="{name: '/auth/Register'}" @click=clearLoginForm>
              <span class="text-[#A3A3A3]">SIGN UP</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
      <form @keydown.enter="signIn" action="" class="flex flex-col gap-6 mt-10">
        <div class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <input v-model=loginForm.email type="text" class="bg-[#D9D9D9]/40 w-full outline-none
              px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="example@mail.com" required />
          <span v-if=loginFormErrors.emailError class="text-red-600 text-xs">{{ loginFormMessages.emailMessage }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
            <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
          </div>
          <div class="relative">
            <input v-model=loginForm.password :type="showPassword ? 'text' : 'password'" class="bg-[#D9D9D9]/40 w-full
                outline-none px-6 py-4 rounded-sm focus:bg-gray-50 placeholder:text-xl" placeholder="••••••••" />
            <img @click=togglePassword :src="showPassword ? opened : closed" alt="" class="absolute w-[30px] top-1/4
                left-57 sm:left-82">
          </div>
          <span v-if=loginFormErrors.passwordError class="text-red-600 text-xs">{{ loginFormMessages.passwordMessage }}</span>
        </div>
      </form>
      <div class="relative">
        <BaseButton @click="signIn" name="SIGN IN" variant="login" />
        <img :src=maki_arrow alt="" class="absolute w-[25px] top-13.5 left-58 sm:left-83">
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>