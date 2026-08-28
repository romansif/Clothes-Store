<template>
  <form @keydown.enter="signUp('Buyer')" action="" class="mt-10">
    <div class="flex flex-col gap-4">
      <div class="flex gap-3">
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
          <BaseInput v-model=registerForm.name type="text" placeholder="name"
                     :error="registerFormErrors.nameError" variant="auth" required
                     :error-message="registerFormErrors.nameError ? registerFormMessages.nameMessage : ''" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
          <BaseInput v-model=registerForm.surName type="text" placeholder="surname"
                     :error="registerFormErrors.surNameError" variant="auth" required
                     :error-message="registerFormErrors.surNameError ? registerFormMessages.surNameMessage : ''" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
        <div class="flex items-center gap-3">
          <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="selectPhoneCodeClass()">
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <IMask v-model:value=registerForm.phone type="tel" :mask="currentMask.mask" :key="selectedCountryCode"
                 :class="signUpPhoneClass" :placeholder="currentCountry?.placeholder" />
        </div>
        <span v-if=registerFormErrors.phoneError class="text-red-600 text-xs">
              {{ registerFormMessages.phoneMessage }}
            </span>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <BaseInput v-model=registerForm.email type="text" placeholder="example@mail.com"
                     :error="registerFormErrors.emailError" variant="auth" required
                     :error-message="registerFormErrors.emailError ? registerFormMessages.emailMessage : ''" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <div class="relative">
            <BaseInput v-model=registerForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
                       :error="registerFormErrors.passwordError" variant="auth" required
                       :error-message="registerFormErrors.passwordError ? registerFormMessages.passwordMessage : ''" />
            <img @click=togglePassword :src="showPassword.password ? opened : closed" alt="" :class="signUpPasswordClass">
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const { signUp } = authApi();
const { showPassword } = authStore();
const { togglePassword } = useAuth();
const { registerFormErrors } = authFormsErrors();
const { countries, selectedCountryCode } = userStore();
const { registerForm, registerFormMessages } = authForms();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { signUpPhoneClass, signUpPasswordClass, selectPhoneCodeClass } = authClasses();

import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { authApi } from "@/features/use-auth/api/auth.api.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { authStore } from "@/entities/auth/model/auth.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { authClasses } from "@/shared/const/auth/auth.classes.ts";
import { authFormsErrors } from "@/features/use-auth/lib/auth.errors.ts";
import { useAuth } from "@/features/use-auth/model/use-auth.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/BaseInput.vue";

watch(() => [registerForm.value.name, registerForm.value.surName, registerForm.value.phone,
  registerForm.value.email, registerForm.value.password],([name, surName, phone, email, password]) => {
      if(name){
        registerFormErrors.value.nameError = false;
      }
      if(surName){
        registerFormErrors.value.surNameError = false;
      }
      if(phone){
        registerFormErrors.value.phoneError = false;
      }
      if(email){
        registerFormErrors.value.emailError = false;
      }
      if(password){
        registerFormErrors.value.passwordError = false;
      }
    }
);
</script>

<style scoped>

</style>