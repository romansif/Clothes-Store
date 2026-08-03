<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { useAuth } from "./auth-composables/use.auth.ts";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { authStore } from "@/shared/composables/stores/auth.store.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";

import SignUpSeller from "./SignUpSeller.vue";
import closed from "@/app/assets/icons/auth/closed.png";
import opened from "@/app/assets/icons/auth/opened.png";
import BaseButton from "@/shared/ui/base/BaseButton.vue";
import maki_arrow from "@/app/assets/icons/arrows/maki--arrow.svg";
import BaseInput from "@/shared/ui/base/BaseInput.vue";

const { signUp } = useAuth();
const { registerFormErrors } = authFormsErrors();
const { showPassword, showSection } = authStore();
const { countries, selectedCountryCode } = usersStore();
const { registerBuyerForm, registerFormMessages } = authForms();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { clearRegisterBuyerForm, clearRegisterSellerForm } = clearAuthForms();

watch(() => [registerBuyerForm.value.name, registerBuyerForm.value.surName, registerBuyerForm.value.privatePhone,
  registerBuyerForm.value.email, registerBuyerForm.value.password],([name, surName, privatePhone, email, password]) => {
      if(name){
        registerFormErrors.value.nameError = false;
      }
      if(surName){
        registerFormErrors.value.surNameError = false;
      }
      if(privatePhone){
        registerFormErrors.value.privatePhoneError = false;
      }
      if(email){
        registerFormErrors.value.emailError = false;
      }
      if(password){
        registerFormErrors.value.passwordError = false;
      }
    }
);

const togglePassword = () => {
  showPassword.value.password = !showPassword.value.password;
};

const toggleRegister = () => {
  showSection.value.section = !showSection.value.section;

  clearRegisterBuyerForm();
  clearRegisterSellerForm();
}
</script>

<template>
  <section v-if="showSection.section === false" class='fixed font-[Montserrat] inset-0 flex items-center justify-center'>
    <div class="bg-white w-[350px] sm:w-[600px] shadow-xl rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-[235px] sm:w-[300px]">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'signIn'}" @click=clearRegisterBuyerForm>
              <span class="text-[#A3A3A3]">SIGN IN</span>
            </router-link>
            <span class="">SIGN UP</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
      <form @keydown.enter="signUp('Buyer')" action="" class="mt-10">
        <div class="flex flex-col gap-4">
          <div class="flex gap-3">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
              <BaseInput v-model=registerBuyerForm.name type="text" placeholder="name" :error="registerFormErrors.nameError"
                  :error-message="registerFormErrors.nameError ? registerFormMessages.nameMessage : ''" variant="auth" required />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
              <BaseInput v-model=registerBuyerForm.surName type="text" placeholder="surname" :error="registerFormErrors.surNameError"
                  :error-message="registerFormErrors.surNameError ? registerFormMessages.surNameMessage : ''" variant="auth" required />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
            <div class="flex items-center gap-3">
              <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                      class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 focus:bg-gray-50 rounded-md py-5 px-3">
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
              <IMask v-model:value=registerBuyerForm.privatePhone type="tel" :mask="currentMask.mask" :key="selectedCountryCode"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                        transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
                          registerFormErrors.privatePhoneError ? 'border border-red-500' : '']"
                     :placeholder="currentCountry?.placeholder" />
            </div>
            <span v-if=registerFormErrors.privatePhoneError class="text-red-600 text-xs">
              {{ registerFormMessages.privatePhoneMessage }}
            </span>
          </div>
          <div class="flex gap-3">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
              <BaseInput v-model=registerBuyerForm.email type="text" placeholder="example@mail.com" :error="registerFormErrors.emailError"
                  :error-message="registerFormErrors.emailError ? registerFormMessages.emailMessage : ''" variant="auth" required />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
              <div class="relative">
                <BaseInput v-model=registerBuyerForm.password :type="showPassword.password ? 'text' : 'password'" placeholder="••••••••"
                    :error="registerFormErrors.passwordError" variant="auth" required
                    :error-message="registerFormErrors.passwordError ? registerFormMessages.passwordMessage : ''" />
                <img @click=togglePassword :src="showPassword.password ? opened : closed" alt=""
                     :class="['absolute w-[30px] top-1/4 left-57 sm:left-51.5', registerFormErrors.passwordError ? 'top-1/9' : '']">
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="flex flex-col gap-3">
        <div class="relative">
          <BaseButton @click="signUp('Buyer')" name="SIGN UP BY BUYER" variant="register" />
          <img :src=maki_arrow alt="" class="absolute w-[25px] top-9.5 left-58 sm:left-121">
        </div>
        <BaseButton @click=toggleRegister name="Sign up by seller" variant="changeRegister" />
      </div>
    </div>
  </section>
  <SignUpSeller />
</template>

<style scoped>

</style>