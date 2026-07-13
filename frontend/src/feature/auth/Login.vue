<script setup lang="ts">
import { watch } from "vue";
import { useAuth } from "./auth-composables/auth.ts";
import { authForms } from "../../shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "../../shared/composables/forms/forms-errors/auth.errors.ts";

import closed from "../../app/assets/icons/auth/closed.png";
import maki_arrow from "../../app/assets/icons/arrows/maki--arrow.svg";

const { login } = useAuth();
const { loginFormErrors } = authFormsErrors()
const { loginForm, loginFormMessages } = authForms()

watch(() => [loginForm.value.email, loginForm.value.password], (email, password) => {
  if(email){
    loginFormErrors.value.emailError = false
  }
  if(password){
    loginFormErrors.value.passwordError = false
  }
})
</script>

<template>
  <section class="font-[Montserrat] fixed inset-0 flex items-center justify-center">
    <div class="bg-white w-[350px] sm:w-[450px] shadow-xl rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-[235px] sm:w-[275px]">
          <div class="font-medium flex items-center justify-between">
            <span class="">LOGIN</span>
            <router-link :to="{name: 'register'}">
              <span class="text-gray-400">REGISTRATION</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl">
        <span>WELCOME TO</span>
        <span class="text-gray-400">THE STORE</span>
      </div>
      <form action="" class="flex flex-col gap-6 mt-10">
        <div class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <input v-model=loginForm.email type="text" class="bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="example@mail.com" required />
          <span>{{ loginFormMessages.emailMessage}}</span>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
            <label class="text-xs text-gray-400 ml-auto">Forgot a password?</label>
          </div>
          <div class="relative">
            <input v-model=loginForm.password type="text" class="bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="••••••••" />
            <img :src=closed alt="" class="absolute w-[30px] top-1/4 left-57 sm:left-82">
          </div>
          <span>{{ loginFormMessages.passwordMessage}}</span>
        </div>
      </form>
      <div class="flex flex-col gap-3">
        <div class="relative">
          <button @click=login class="bg-black text-white rounded px-6 py-3.5 mt-10 font-semibold w-full text-start">
            LOGIN
          </button>
          <img :src=maki_arrow alt="" class="absolute w-[25px] top-13.5 left-58 sm:left-83">
        </div>
        <span class="text-center text-sm text-gray-400">Login by seller</span>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>