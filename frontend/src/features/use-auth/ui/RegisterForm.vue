<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
        <BaseInput v-model=registerForm.name
                   placeholder="name"
                   :error-message="registerFormErrorMessages.name ? registerFormErrorMessages.name : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
        <BaseInput v-model=registerForm.surName
                   placeholder="surname"
                   :error-message="registerFormErrorMessages.surName ? registerFormErrorMessages.surName : ''" />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <select v-model="selectedCountryCode"
                @change="changeCountry"
                :class="selectPhoneCodeClass()">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=registerForm.phone
               :mask="currentMask.mask"
               :key="selectedCountryCode"
               :class="getPhoneClass(registerFormErrorMessages.phone)"
               :placeholder="currentCountry?.placeholder" />
      </div>
      <span v-if=registerFormErrorMessages.phone class="text-red-600 text-xs">
        {{ registerFormErrorMessages.phone }}
      </span>
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
        <BaseInput v-model=registerForm.email
                   type="email"
                   placeholder="example@mail.com"
                   :error-message="registerFormErrorMessages.email ? registerFormErrorMessages.email : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <div class="relative">
          <BaseInput v-model=registerForm.password
                     :type="showPassword.password ? 'text' : 'password'"
                     placeholder="••••••••"
                     :error-message="registerFormErrorMessages.password ? registerFormErrorMessages.password : ''" />
          <img @click=togglePassword
               :src="showPassword.password ? opened : closed" alt=""
               :class="getSignUpPasswordClass(registerFormErrorMessages.password)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { baseClasses } from "@/shared/const/base.classes.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { authClasses } from "@/shared/const/auth/auth.classes.ts";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { registerForm, registerFormErrorMessages } from "@/entities/auth/model/auth.forms.ts";
import { selectedCountryCode, countries } from "@/shared/lib/select-phone-form.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/base/BaseInput.vue";

const { showPassword } = authStore();
const { togglePassword } = toggleAuth();
const { getPhoneClass } = baseClasses();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { selectPhoneCodeClass, getSignUpPasswordClass } = authClasses();

refClearErrorsOnChange(
    registerForm,
    registerFormErrorMessages
)
</script>

<style scoped>

</style>