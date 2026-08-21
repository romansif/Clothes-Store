<template>
  <form class="w-full mt-10">
    <div v-if="!isSendCode" class="flex flex-col gap-2">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="selectPhoneCodeClass">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=loginForm.phone type="text" :mask="currentMask.mask" :key="selectedCountryCode"
               :class="signInPhoneClass" :placeholder="currentCountry?.placeholder" />
      </div>
      <span class="text-xs text-[#A3A3A3] text-center">We will send you an SMS with a 6-digit confirmation code.</span>
      <span v-if=loginFormErrors.phoneError class="text-red-600 text-xs">
        {{ loginFormMessages.phoneMessage }}
      </span>
    </div>
    <div v-else class="flex flex-col items-center gap-2">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">VALIDATION CODE</label>
      <div class="flex items-center gap-2 mt-2" @paste="handlePaste">
        <input v-for="(index) in CODE_LENGTH" :key="index" :ref="(el) => setInputRef(el, index)"
               type="number" :value="codeDigits[index]" :class="signInCodeClass"
               @input="handleInput(index, $event)" @keydown="handleKeyDown(index, $event)"/>
      </div>
      <div v-if="!isNewCode" class="flex gap-1 text-center text-sm duration-400 text-indigo-600">
        <button>The code can be sent via</button>
        <span>{{ formattedTimer }}</span>
      </div>
      <BaseButton v-else name="Send new code" variant="changeRegister" />
    </div>
  </form>
</template>

<script setup lang="ts">
const { loginFormErrors } = authFormsErrors();
const { countries, selectedCountryCode } = usersStore();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { signInPhoneClass, signInCodeClass, selectPhoneCodeClass } = authClasses();
const { loginForm, loginFormMessages, CODE_LENGTH, codeDigits, isSendCode, isNewCode } = authForms();
const { setInputRef, handleInput, handleKeyDown, handlePaste, stopTimer, formattedTimer } = toggleAuth();

import { onUnmounted } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { usersStore } from "@/feature/profile/model/users.store.ts";
import { authForms } from "@/feature/auth/model/auth.forms.ts";
import { toggleAuth } from "@/feature/auth/api/toggleAuth.ts";
import { authClasses } from "@/shared/constants/auth/auth.classes.ts";
import { authFormsErrors } from "@/feature/auth/lib/auth.errors.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";

onUnmounted(() => {
  stopTimer();
})
</script>

<style scoped>

</style>