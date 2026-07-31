<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { useAuth } from "./auth-composables/use-auth.ts";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { authStore} from "@/shared/composables/stores/auth.store.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";

import opened from "@/app/assets/icons/auth/opened.png";
import closed from "@/app/assets/icons/auth/closed.png";
import BaseButton from "@/shared/ui/button/BaseButton.vue";
import maki_arrow from "@/app/assets/icons/arrows/maki--arrow.svg";

const { signUp } = useAuth();
const { registerFormErrors } = authFormsErrors();
const { showPassword, showSection } = authStore();
const { countries, selectedCountryCode } = usersStore();
const { registerSellerForm, registerFormMessages } = authForms();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { clearRegisterSellerForm, clearRegisterBuyerForm } = clearAuthForms();

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

const togglePassword = () => {
  showPassword.value.password = !showPassword.value.password;
};;

const toggleRegister = () => {
  showSection.value.section = !showSection.value.section;

  clearRegisterBuyerForm();
  clearRegisterSellerForm();
}
</script>

<template>
  <section v-if="showSection.section === true" class='fixed font-[Montserrat] inset-0 flex items-center justify-center' >
    <div class="bg-white w-[350px] sm:w-[600px] shadow-xl rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-[235px] sm:w-[300px]">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'signIn'}" @click=clearRegisterSellerForm>
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
      <form @keydown.enter="signUp('Seller')" action="" class="mt-10">
        <div class="flex flex-col gap-4">
          <div class="flex gap-3">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
              <input v-model=registerSellerForm.name type="text"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
                     registerFormErrors.nameError ? 'border border-red-500' : '']" placeholder="name" required />
              <span v-if=registerFormErrors.nameError class="text-red-600 text-xs">
                {{ registerFormMessages.nameMessage }}
              </span>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
              <input v-model=registerSellerForm.surName type="text"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
                     registerFormErrors.surNameError ? 'border border-red-500' : '']" placeholder="surname" required />
              <span v-if=registerFormErrors.surNameError class="text-red-600 text-xs">
                {{ registerFormMessages.surNameMessage }}
              </span>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">COMPANY NAME</label>
              <input v-model=registerSellerForm.companyName type="text"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
                     registerFormErrors.companyNameError ? 'border border-red-500' : '']" placeholder="company" required />
              <span v-if=registerFormErrors.companyNameError class="text-red-600 text-xs">
                {{ registerFormMessages.companyNameMessage }}
              </span>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
              <input v-model=registerSellerForm.email type="text"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
                     registerFormErrors.emailError ? 'border border-red-500' : '']" placeholder="example@mail.com" required />
              <span v-if=registerFormErrors.emailError class="text-red-600 text-xs">
                {{ registerFormMessages.emailMessage }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
            <div class="flex gap-3">
              <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                      class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 focus:bg-gray-50 rounded-md py-5 px-3">
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
              <IMask v-model:value=registerSellerForm.publicPhone type="text" :mask="currentMask.mask" :key="selectedCountryCode"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
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
              <input v-model=registerSellerForm.password :type="showPassword.password ? 'text' : 'password'"
                     :class="[`bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
                       transition duration-400 hover:bg-gray-50 focus:bg-gray-50  placeholder:text-xl`,
                      registerFormErrors.passwordError ? 'border border-red-500' : '']" placeholder="••••••••" required />
              <img @click=togglePassword :src="showPassword.password ? opened : closed" alt="" class="absolute w-[30px] top-1/4
                    left-57 sm:left-120">
            </div>
            <span v-if=registerFormErrors.passwordError class="text-red-600 text-xs">
                {{ registerFormMessages.passwordMessage }}
              </span>
          </div>
        </div>
      </form>
      <div class="flex flex-col gap-3">
        <div class="relative">
          <BaseButton @click="signUp('Seller')" name="SIGN UP BY SELLER" variant="register"/>
          <img :src=maki_arrow alt="" class="absolute w-[25px] top-9.5 left-58 sm:left-121">
        </div>
        <BaseButton @click=toggleRegister name="Sign up by buyer" variant="changeRegister" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>