<script setup lang="ts">
import { watch } from "vue";
import { useAuth } from "./auth-composables/auth.ts";
import { authForms } from "../../shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "../../shared/composables/forms/forms-errors/auth.errors.ts";
import { clearAuthForms } from "../../shared/composables/forms/clear-forms/clear.auth.ts";
import { authStore} from "../../shared/composables/stores/auth.store.ts";

import opened from "../../app/assets/icons/auth/opened.png";
import closed from "../../app/assets/icons/auth/closed.png";
import maki_arrow from "../../app/assets/icons/arrows/maki--arrow.svg";
import BaseButton from "../../shared/ui/button/BaseButton.vue";

const { register } = useAuth()
const { showPassword, showSection } = authStore()
const { clearRegisterSellerForm, clearRegisterBuyerForm } = clearAuthForms()
const { registerFormErrors } = authFormsErrors()
const { registerSellerForm, registerFormMessages } = authForms()

watch(() => [registerSellerForm.value.name, registerSellerForm.value.surName, registerSellerForm.value.companyName,
  registerSellerForm.value.publicPhone, registerSellerForm.value.email, registerSellerForm.value.password],
    ([name, surName, companyName, publicPhone, email, password]) => {
      if(name){
        registerFormErrors.value.nameError = false
      }
      if(surName){
        registerFormErrors.value.surNameError = false
      }
      if(companyName){
        registerFormErrors.value.companyNameError = false
      }
      if(publicPhone){
        registerFormErrors.value.publicPhoneError = false
      }
      if(email){
        registerFormErrors.value.emailError = false
      }
      if(password){
        registerFormErrors.value.passwordError = false
      }
    }
)

const togglePassword = () => {
  showPassword.value.password = !showPassword.value.password
}

const toggleRegister = () => {
  showSection.value.section = !showSection.value.section

  clearRegisterSellerForm()
  clearRegisterBuyerForm()
}
</script>

<template>
  <section v-if="showSection.section === true" class='fixed font-[Montserrat] inset-0 flex items-center justify-center' >
    <div class="bg-white w-[350px] sm:w-[600px] shadow-xl rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-[235px] sm:w-[415px]">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'login'}" @click=clearRegisterSellerForm>
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
      <form @keydown.enter="register('Seller')" action="" class="flex flex-col gap-6 mt-10">
        <div class="flex gap-3">
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
            <input v-model=registerSellerForm.name type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="name" required />
            <span v-if=registerFormErrors.nameError class="text-red-600 text-xs">
              {{ registerFormMessages.nameMessage }}
            </span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
            <input v-model=registerSellerForm.surName type="text" class="bg-[#D9D9D9]/40 w-full outline-none
                px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="surname" required />
            <span v-if=registerFormErrors.surNameError class="text-red-600 text-xs">
              {{ registerFormMessages.surNameMessage }}
            </span>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">COMPANY NAME</label>
            <input v-model=registerSellerForm.companyName type="text" class="bg-[#D9D9D9]/40 w-full
                outline-none px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="company" required />
            <span v-if=registerFormErrors.companyNameError class="text-red-600 text-xs">
              {{ registerFormMessages.companyNameMessage }}
            </span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PUBLIC PHONE</label>
            <input v-model=registerSellerForm.publicPhone type="text" class="bg-[#D9D9D9]/40 w-full
                outline-none px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="+000 (00) 000-00-00" required />
            <span v-if=registerFormErrors.publicPhoneError class="text-red-600 text-xs">
              {{ registerFormMessages.publicPhoneMessage }}
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
          <input v-model=registerSellerForm.email type="text" class="bg-[#D9D9D9]/40 w-full outline-none
              px-6 py-4 rounded-sm focus:bg-gray-50" placeholder="example@mail.com" required />
          <span v-if=registerFormErrors.emailError class="text-red-600 text-xs">
            {{ registerFormMessages.emailMessage }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
          <div class="relative">
            <input v-model=registerSellerForm.password :type="showPassword.password ? 'text' : 'password'"
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
          <BaseButton @click="register('Seller')" name="REGISTRATION BY SELLER" variant="register"/>
          <img :src=maki_arrow alt="" class="absolute w-[25px] top-13.5 left-58 sm:left-121">
        </div>
        <BaseButton @click=toggleRegister name="Registration by buyer" variant="changeRegister" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>