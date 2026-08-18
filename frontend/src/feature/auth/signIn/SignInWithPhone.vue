<script setup lang="ts">
import { onUnmounted } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { toggleAuth } from "@/feature/auth/auth-composables/toggleAuth.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";

import maki_arrow from "@/app/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { clearLoginForm } = clearAuthForms();
const { loginFormErrors } = authFormsErrors();
const { countries, selectedCountryCode } = usersStore();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { loginForm, loginFormMessages, CODE_LENGTH, codeDigits, isSendCode, isNewCode } = authForms();
const { toggleSignIn, setInputRef, handleInput, handleKeyDown, handlePaste, stopTimer, formattedTimer } = toggleAuth();

onUnmounted(() => {
  stopTimer();
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 flex items-center justify-center">
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
      <form class="w-full mt-10">
        <div v-if="!isSendCode" class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
          <div class="flex gap-3">
            <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                    class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                          hover:bg-gray-50 rounded-md py-5 px-3">
              <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
              </option>
            </select>
            <IMask v-model:value=loginForm.phone type="text" :mask="currentMask.mask" :key="selectedCountryCode"
                   :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                         transition duration-400 hover:bg-gray-50`,
                           loginFormErrors.phoneError ? 'border border-red-500' : '']"
                   :placeholder="currentCountry?.placeholder" />
          </div>
          <span class="text-xs text-[#A3A3A3] text-center">We will send you an SMS with a 6-digit confirmation code.</span>
          <span v-if=loginFormErrors.phoneError class="text-red-600 text-xs">
            {{ loginFormMessages.phoneMessage }}
          </span>
        </div>
        <div v-else class="flex flex-col items-center gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">VALIDATION CODE</label>
          <div class="flex items-center gap-2 mt-2" @paste="handlePaste">
            <input v-for="(index) in CODE_LENGTH" :key="index" :ref="(el) => setInputRef(el, index)" type="number" :value="codeDigits[index]"
                   :class="[`text-center bg-[#D9D9D9]/40 w-14 outline-none px-2 py-4 rounded-sm border border-gray-300
                    transition duration-400 hover:bg-gray-50`,
                    loginFormErrors.phoneError ? 'border border-red-500' : '']"
                  @input="handleInput(index, $event)" @keydown="handleKeyDown(index, $event)"/>
          </div>
          <div v-if="!isNewCode" class="flex gap-1 text-center text-sm duration-400 text-indigo-600">
            <button>The code can be sent via</button>
            <span>{{ formattedTimer }}</span>
          </div>
          <BaseButton v-else name="Send new code" variant="changeRegister" />
        </div>
      </form>
      <div class="relative duration-400 hover:scale-105 cursor-pointer">
        <BaseButton name="SEND CODE" variant="login" />
        <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-83 ">
      </div>
      <div class="flex flex-col items-center gap-3 mt-3">
        <BaseButton @click="toggleSignIn" name="Sign in using your email, password" variant="changeRegister" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>