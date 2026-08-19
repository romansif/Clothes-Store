<template>
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
                        hover:bg-gray-50 rounded-md py-5 px-3">
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <IMask v-model:value=registerBuyerForm.privatePhone type="tel" :mask="currentMask.mask" :key="selectedCountryCode"
                 :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                        transition duration-400 hover:bg-gray-50 appearance-none`,
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
                 :class="['absolute w-7.5 top-1/4 left-57 sm:left-51.5', registerFormErrors.passwordError ? 'top-1/9' : '']">
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { auth } from "@/feature/auth/auth-actions/auth.ts";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { authStore } from "@/shared/composables/stores/auth.store.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";
import { toggleAuth } from "@/feature/auth/auth-actions/toggleAuth.ts";

import closed from "@/app/assets/icons/auth/closed.png";
import opened from "@/app/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { signUp } = auth();
const { showPassword } = authStore();
const { togglePassword } = toggleAuth();
const { registerFormErrors } = authFormsErrors();
const { countries, selectedCountryCode } = usersStore();
const { registerBuyerForm, registerFormMessages } = authForms();
const { changeCountry, currentCountry, currentMask } = usePhoneForm();

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
</script>

<style scoped>

</style>