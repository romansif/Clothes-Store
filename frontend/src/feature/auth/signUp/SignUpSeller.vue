<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { auth } from "../auth-composables/auth.ts";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { authStore} from "@/shared/composables/stores/auth.store.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";
import { toggleAuth } from "@/feature/auth/auth-composables/toggleAuth.ts";

import opened from "@/app/assets/icons/auth/opened.png";
import closed from "@/app/assets/icons/auth/closed.png";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import maki_arrow from "@/app/assets/icons/arrows/right-short-arrow.svg";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { signUp } = auth();
const { showPassword } = authStore();
const { registerFormErrors } = authFormsErrors();
const { clearRegisterSellerForm } = clearAuthForms();
const { togglePassword, toggleSignUp } = toggleAuth();
const { countries, selectedCountryCode } = usersStore();
const { registerSellerForm, registerFormMessages } = authForms();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();

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

<template>
  <div class='fixed font-[Montserrat] inset-0 flex items-center justify-center' >
    <div class="w-87.5 sm:w-150 rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-58.75 sm:w-75">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'signIn'}" @click=clearRegisterSellerForm>
              <span class="text-[#A3A3A3]">SIGN IN</span>
            </router-link>
            <span class="">SIGN UP</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
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
          <div class="flex gap-3">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">COMPANY NAME</label>
              <BaseInput v-model=registerSellerForm.companyName type="text" placeholder="company" :error="registerFormErrors.companyNameError"
                  :error-message="registerFormErrors.companyNameError ? registerFormMessages.companyNameMessage : ''" variant="auth" required />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
              <BaseInput v-model=registerSellerForm.email type="text" placeholder="example@mail.com" :error="registerFormErrors.emailError"
                  :error-message="registerFormErrors.emailError ? registerFormMessages.emailMessage : ''" variant="auth" required />
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
            <div class="flex gap-3">
              <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                      class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 rounded-md py-5 px-3">
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
              <IMask v-model:value=registerSellerForm.publicPhone type="text" :mask="currentMask.mask" :key="selectedCountryCode"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50`,
                         registerFormErrors.publicPhoneError ? 'border border-red-500' : '']"
                     :placeholder="currentCountry?.placeholder" />
            </div>
            <span v-if=registerFormErrors.publicPhoneError class="text-red-600 text-xs">
              {{ registerFormMessages.publicPhoneMessage }}
            </span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
            <div class="relative">
              <BaseInput v-model=registerSellerForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
                  :error="registerFormErrors.passwordError" variant="auth" required
                  :error-message="registerFormErrors.passwordError ? registerFormMessages.passwordMessage : ''" />
              <img @click=togglePassword :src="showPassword.password ? opened : closed" alt=""
                   :class="['absolute w-7.5 top-1/4 left-57 sm:left-120', registerFormErrors.passwordError ? 'top-1/7' : '']">
            </div>
          </div>
        </div>
      </form>
      <div class="flex flex-col gap-3">
        <div class="relative duration-400 hover:scale-105 cursor-pointer">
          <BaseButton @click="signUp('Seller')" name="SIGN UP BY SELLER" variant="register"/>
          <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-121">
        </div>
        <BaseButton @click="toggleSignUp" name="Sign up as a buyer" variant="changeRegister" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>