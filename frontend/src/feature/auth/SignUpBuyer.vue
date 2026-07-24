<script setup lang="ts">
import { watch } from "vue";
import { useAuth } from "./auth-composables/auth.ts";
import { authForms } from "../../shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "../../shared/composables/forms/forms-errors/auth.errors.ts";
import { clearAuthForms } from "../../shared/composables/forms/clear-forms/clear.auth.ts";
import { authStore} from "../../shared/composables/stores/auth.store.ts";

import closed from "../../app/assets/icons/auth/closed.png";
import opened from "../../app/assets/icons/auth/opened.png";
import maki_arrow from "../../app/assets/icons/arrows/maki--arrow.svg";
import RegisterSeller from "./RegisterSeller.vue";
import BaseButton from "../../shared/ui/button/BaseButton.vue";

const { register } = useAuth();
const { registerFormErrors } = authFormsErrors();
const { showPassword, showSection } = authStore();
const { registerBuyerForm, registerFormMessages } = authForms();
const { clearRegisterBuyerForm, clearRegisterSellerForm } = clearAuthForms();


watch(() => [registerBuyerForm.value.name, registerBuyerForm.value.surName, registerBuyerForm.value.privatePhone,
  registerBuyerForm.value.email, registerBuyerForm.value.password],([name, surName, privatePhone, email, password]) => {
      if(name){
        registerFormErrors.value.nameError = false;
      };
      if(surName){
        registerFormErrors.value.surNameError = false;
      };
      if(privatePhone){
        registerFormErrors.value.privatePhoneError = false;
      };
      if(email){
        registerFormErrors.value.emailError = false;
      };
      if(password){
        registerFormErrors.value.passwordError = false;
      };
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
        <div class="w-[235px] sm:w-[275px]">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'login'}" @click=clearRegisterBuyerForm>
              <span class="text-[#A3A3A3]">LOGIN</span>
            </router-link>
            <span class="">REGISTRATION</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
      <form @keydown.enter="register('Buyer')" action="" class="flex flex-col gap-6 mt-10">
        <div class="flex gap-3">
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
            <input v-model=registerBuyerForm.name type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="name" required />
            <span v-if=registerFormErrors.nameError class="text-red-600 text-xs">
              {{ registerFormMessages.nameMessage }}
            </span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
            <input v-model=registerBuyerForm.surName type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="surname" required />
            <span v-if=registerFormErrors.surNameError class="text-red-600 text-xs">
              {{ registerFormMessages.surNameMessage }}
            </span>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
            <input v-model=registerBuyerForm.email type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="example@mail.com" required />
            <span v-if=registerFormErrors.emailError class="text-red-600 text-xs">
              {{ registerFormMessages.emailMessage }}
            </span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
            <input v-model=registerBuyerForm.privatePhone type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="+### (##) ###-##-##" required />
            <span v-if=registerFormErrors.privatePhoneError class="text-red-600 text-xs">
              {{ registerFormMessages.privatePhoneMessage }}
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <div class="relative">
            <input v-model=registerBuyerForm.password :type="showPassword.password ? 'text' : 'password'"
                class="bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm focus:bg-gray-50  placeholder:text-xl"
                placeholder="••••••••" />
            <img @click=togglePassword :src="showPassword.password ? opened : closed" alt="" class="absolute w-[30px] top-1/4
                left-57 sm:left-120">
          </div>
          <span v-if=registerFormErrors.passwordError class="text-red-600 text-xs">
            {{ registerFormMessages.passwordMessage }}
          </span>
        </div>
      </form>
      <div class="flex flex-col gap-3">
        <div class="relative">
          <BaseButton @click="register('Buyer')" name="REGISTRATION BY BUYER" variant="register" />
          <img :src=maki_arrow alt="" class="absolute w-[25px] top-13.5 left-58 sm:left-121">
        </div>
        <BaseButton @click=toggleRegister name="Registration by seller" variant="changeRegister" />
      </div>
    </div>
  </section>
  <RegisterSeller />
</template>

<style scoped>

</style>