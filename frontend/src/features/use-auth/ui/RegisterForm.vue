<template>
  <form @keydown.enter="signUp('Buyer')" action="" class="mt-10">
    <div class="flex flex-col gap-4">
      <div class="flex gap-3">
        <div class="flex flex-col gap-3 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
          <BaseInput v-model=registerForm.name type="text" placeholder="name"
                     :error="registerFormErrors.nameError" variant="auth" required
                     :error-message="registerFormErrors.nameError ? registerFormErrorMessages.nameMessage : ''" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
          <BaseInput v-model=registerForm.surName type="text" placeholder="surname"
                     :error="registerFormErrors.surNameError" variant="auth" required
                     :error-message="registerFormErrors.surNameError ? registerFormErrorMessages.surNameMessage : ''" />
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
        <div class="flex flex-col gap-3 sm:flex-row">
          <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="selectPhoneCodeClass()">
            <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
            </option>
          </select>
          <IMask v-model:value=registerForm.phone type="tel" :mask="currentMask.mask" :key="selectedCountryCode"
                 :class="signUpPhoneClass" :placeholder="currentCountry?.placeholder" />
        </div>
        <span v-if=registerFormErrors.phoneError class="text-red-600 text-xs">
          {{ registerFormErrorMessages.phoneMessage }}
        </span>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <BaseInput v-model=registerForm.email type="text" placeholder="example@mail.com"
                     :error="registerFormErrors.emailError" variant="auth" required
                     :error-message="registerFormErrors.emailError ? registerFormErrorMessages.emailMessage : ''" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <div class="relative">
            <BaseInput v-model=registerForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
                       :error="registerFormErrors.passwordError" variant="auth" required
                       :error-message="registerFormErrors.passwordError ? registerFormErrorMessages.passwordMessage : ''" />
            <img @click=togglePassword :src="showPassword.password ? opened : closed" alt="" :class="signUpPasswordClass">
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { useAuth } from "@/features/use-auth/api/use-auth.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { authClasses } from "@/shared/const/auth/auth.classes.ts";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth.ts";
import { selectedCountryCode, countries } from "@/features/use-profile-form/model/select.phone.form.ts";
import { registerForm, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { registerFormErrors } from "@/features/use-auth/lib/auth.errors.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/BaseInput.vue";

const { signUp } = useAuth();
const { showPassword } = authStore();
const { togglePassword } = toggleAuth();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { signUpPhoneClass, signUpPasswordClass, selectPhoneCodeClass } = authClasses();

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