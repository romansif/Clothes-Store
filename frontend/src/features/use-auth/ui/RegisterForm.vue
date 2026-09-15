<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
        <BaseInput v-model=registerForm.name
                   type="text"
                   placeholder="name"
                   :error="registerFormErrors.name"
                   :error-message="registerFormErrors.name ? registerFormErrorMessages.name : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
        <BaseInput v-model=registerForm.surName
                   type="text"
                   placeholder="surname"
                   :error="registerFormErrors.surName"
                   :error-message="registerFormErrors.surName ? registerFormErrorMessages.surName : ''" />
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
               :class="signUpPhoneClass"
               :placeholder="currentCountry?.placeholder" />
      </div>
      <span v-if=registerFormErrors.phone class="text-red-600 text-xs">
          {{ registerFormErrorMessages.phone }}
        </span>
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
        <BaseInput v-model=registerForm.email
                   type="text"
                   placeholder="example@mail.com"
                   :error="registerFormErrors.email"
                   :error-message="registerFormErrors.email ? registerFormErrorMessages.email : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <div class="relative">
          <BaseInput v-model=registerForm.password
                     :type="showPassword.password ? 'text' : 'password'"
                     placeholder="••••••••"
                     :error="registerFormErrors.password"
                     :error-message="registerFormErrors.password ? registerFormErrorMessages.password : ''" />
          <img @click=togglePassword :src="showPassword.password ? opened : closed" alt="" :class="signUpPasswordClass">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { authClasses } from "@/shared/const/auth/auth.classes.ts";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth.ts";
import { selectedCountryCode, countries } from "@/shared/lib/select-phone-form.ts";
import { registerForm, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { registerFormErrors } from "@/features/use-auth/model/auth.errors.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/BaseInput.vue";

const { showPassword } = authStore();
const { togglePassword } = toggleAuth();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { signUpPhoneClass, signUpPasswordClass, selectPhoneCodeClass } = authClasses();

watch(() => [registerForm.value.name, registerForm.value.surName, registerForm.value.phone,
      registerForm.value.email, registerForm.value.password],([name, surName, phone, email, password]) => {
      if(name){
        registerFormErrors.value.name = false;
      }
      if(surName){
        registerFormErrors.value.surName = false;
      }
      if(phone){
        registerFormErrors.value.phone = false;
      }
      if(email){
        registerFormErrors.value.email = false;
      }
      if(password){
        registerFormErrors.value.password = false;
      }
    }
);
</script>

<style scoped>

</style>