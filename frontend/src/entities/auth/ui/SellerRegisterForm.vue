<template>
  <form @keydown.enter="signUp('Seller')" action="" class="mt-10">
    <div class="flex flex-col gap-4">
      <div class="flex gap-3">
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
          <BaseInput v-model=registerSellerForm.name type="text" placeholder="name" :error="registerFormErrors.nameError"
                     :error-message="registerFormErrors.nameError ? registerFormMessages.nameMessage : ''" variant="auth" required />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
          <BaseInput v-model=registerSellerForm.surName type="text" placeholder="surname" :error="registerFormErrors.surNameError"
                     :error-message="registerFormErrors.surNameError ? registerFormMessages.surNameMessage : ''" variant="auth" required />
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">COMPANY NAME</label>
        <BaseInput v-model=registerSellerForm.companyName type="text" placeholder="company" :error="registerFormErrors.companyNameError"
                   :error-message="registerFormErrors.companyNameError ? registerFormMessages.companyNameMessage : ''" variant="auth" required />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
        <div class="flex gap-3">
          <select name="" id="" v-model="selectedCountryCode" @change="changeCountry" :class="selectPhoneCodeClass()">
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <IMask v-model:value=registerSellerForm.publicPhone type="text" :placeholder="currentCountry?.placeholder"
                 :class="signUpSellerPhoneClass" :key="selectedCountryCode" :mask="currentMask.mask"  />
        </div>
        <span v-if=registerFormErrors.publicPhoneError class="text-red-600 text-xs">
          {{ registerFormMessages.publicPhoneMessage }}
        </span>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <BaseInput v-model=registerSellerForm.email type="text" placeholder="example@mail.com"
                     :error="registerFormErrors.emailError" variant="auth" required
                     :error-message="registerFormErrors.emailError ? registerFormMessages.emailMessage : ''" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <div class="relative">
            <BaseInput v-model=registerSellerForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
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
const { registerSellerForm, registerFormMessages } = authForms();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();
const { signUpSellerPhoneClass, signUpPasswordClass, selectPhoneCodeClass } = authClasses();

import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { authApi } from "@/feature/use-auth/api/auth.api.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { authStore} from "@/entities/auth/model/auth.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { authForms } from "@/feature/use-auth/model/auth.forms.ts";
import { authFormsErrors } from "@/feature/use-auth/lib/auth.errors.ts";
import { useAuth } from "@/feature/use-auth/model/use-auth.ts";
import { authClasses } from "@/shared/constants/auth/auth.classes.ts";

import opened from "@/assets/icons/auth/opened.png";
import closed from "@/assets/icons/auth/closed.png";

import BaseInput from "@/shared/ui/BaseInput.vue";

watch(() => [registerSellerForm.value.name, registerSellerForm.value.surName, registerSellerForm.value.companyName,
  registerSellerForm.value.publicPhone, registerSellerForm.value.email, registerSellerForm.value.password],
    ([name, surName, companyName, publicPhone, email, password]) => {
      if(name){
        registerFormErrors.value.nameError = false;
      }
      if(surName){
        registerFormErrors.value.surNameError = false;
      }
      if(companyName){
        registerFormErrors.value.companyNameError = false;
      }
      if(publicPhone){
        registerFormErrors.value.publicPhoneError = false;
      }
      if(email){
        registerFormErrors.value.emailError = false;
      }
      if(password){
        registerFormErrors.value.passwordError = false;
      }
    }
)
</script>

<style scoped>

</style>