<script setup lang="ts">
import { ref, watch } from 'vue'

import { userForms } from "../../../composables/forms-composables/forms/users.forms.ts";
import { useUpdateProfile } from "../../../../feature/profile/profile-composables/useUpdateProfile.ts";
import { userFormsErrors } from "../../../composables/forms-composables/forms-errors/users.errors.ts";

import opened from '../../../../app/assets/icons/auth/opened.png'
import closed from '../../../../app/assets/icons/auth/closed.png'
import BaseButton  from "../../button/BaseButton.vue";
import SellerEmailForm from "./email-phone-form/SellerEmailForm.vue";
import SellerForm from "./email-phone-form/SellerForm.vue";
import BuyerForm from "./email-phone-form/BuyerForm.vue";

const { updatePasswordAccount, updateNameAccount, updateSurNameAccount } = useUpdateProfile();
const {
  updateUserFormPublicPhoneErrors,
  updateUserNameErrors, updateUserSurNameErrors,
  updateUserEmailErrors, updateUserPasswordErrors,
  updateUserPhoneErrors, updateUserFormCompanyNameErrors,
} = userFormsErrors();

const {
  updateUserPhone, updateUserEmail,
  updateUserName, updateUserFormNameMessage,
  updateUserSurName, updateUserFormSurNameMessage,
  updateUserCompanyName, updateUserFormPublicPhone,
  updateUserPassword, updateUserFormPasswordMessages,
} = userForms();

watch(() => [
      updateUserName.value.name, updateUserSurName.value.surName,
      updateUserPhone.value.phone, updateUserCompanyName.value.companyName,
      updateUserFormPublicPhone.value.publicPhone, updateUserEmail.value.email,
      updateUserPassword.value.oldPassword, updateUserPassword.value.newPassword],
    ([name, surName, phone, companyName, publicPhone, email, oldPassword, newPassword]) => {
      if(name){
        updateUserNameErrors.value.nameError = false
      }
      if(surName){
        updateUserSurNameErrors.value.surNameError = false
      }
      if(phone){
        updateUserPhoneErrors.value.phoneError = false
      }
      if(companyName){
        updateUserFormCompanyNameErrors.value.companyNameError = false
      }
      if(publicPhone){
        updateUserFormPublicPhoneErrors.value.publicPhoneError = false
      }
      if(email){
        updateUserEmailErrors.value.emailError = false
      }
      if(oldPassword){
        updateUserPasswordErrors.value.oldPasswordError = false
      }
      if(newPassword){
        updateUserPasswordErrors.value.newPasswordError = false
      }
    console.log(oldPassword, newPassword)
    }
)

const showOldPassword = ref(false)
const showNewPassword = ref(false)

const toggleOldPassword = () => {
  showOldPassword.value = !showOldPassword.value
}

const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}
</script>

<template>
  <div class="flex font-medium flex-col gap-5 pt-5">
    <div class="flex flex-col gap-5">
      <div class="flex gap-10">
        <form @keydown.enter.prevent="updateNameAccount" class="flex flex-col gap-3 w-full">
          <label for="">Name</label>
          <input v-model=updateUserName.name type="text" inputmode="numeric"
                 class="border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="New Name" />
          <span v-if=updateUserNameErrors.nameError class="text-red-600 text-xs">
            {{ updateUserFormNameMessage.nameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updateSurNameAccount" class="flex flex-col gap-3 w-full">
          <label for="">SurName</label>
          <input v-model=updateUserSurName.surName type="text" inputmode="numeric"
                 class="border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="New SurName"/>
          <span v-if=updateUserSurNameErrors.surNameError class="text-red-600 text-xs">
            {{ updateUserFormSurNameMessage.surNameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateSurNameAccount()" name="Save SurName" variant="profileForm" />
          </div>
        </form>
      </div>
      <SellerForm />
    </div>
    <BuyerForm />
    <div class="flex flex-col">
      <form @keydown.enter.prevent="updatePasswordAccount" class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <div class="relative">
            <input v-model=updateUserPassword.oldPassword :type="showOldPassword ? 'text' : 'password'" inputmode="numeric"
                   class="w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="Old Password" />
            <img @click.prevent=toggleOldPassword :src="showOldPassword ? opened : closed" alt=""
                class="absolute w-[30px] top-1/5 left-115">
          </div>
          <span v-if=updateUserPasswordErrors.oldPasswordError class="text-red-600 text-xs">
            {{ updateUserFormPasswordMessages.oldPasswordMessage }}
          </span>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <div class="relative">
            <input v-model=updateUserPassword.newPassword :type="showNewPassword ? 'text' : 'password'" inputmode="numeric"
                   class=" w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="New Password" />
            <img @click.prevent=toggleNewPassword :src="showNewPassword ? opened : closed" alt=""
                class="absolute w-[30px] top-1/5 left-115">
          </div>
          <span v-if=updateUserPasswordErrors.newPasswordError class="text-red-600 text-xs">
            {{ updateUserFormPasswordMessages.newPasswordMessage }}
          </span>
        </div>
      </form>
      <div class="flex mt-3">
        <BaseButton @click.prevent="updatePasswordAccount()" name="Save Password" variant="profileForm" />
      </div>
    </div>
    <SellerEmailForm />
  </div>
</template>

<style scoped>

</style>