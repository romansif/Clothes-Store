<script setup lang="ts">
import { ref, watch } from 'vue'

import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/composables/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton  from "@/shared/ui/base/button/BaseButton.vue";
import BuyerForm from "./email-phone-form/BuyerForm.vue";
import SellerForm from "./email-phone-form/SellerForm.vue";
import opened from '@/app/assets/icons/auth/opened.png'
import closed from '@/app/assets/icons/auth/closed.png'
import SellerEmailForm from "./email-phone-form/SellerEmailForm.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { updatePasswordAccount, updateNameAccount, updateSurNameAccount } = useProfile();
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
  updateUserCompanyName, updateUserPublicPhone,
  updateUserPassword, updateUserFormPasswordMessages,
} = userForms();

watch(() => [
      updateUserName.value.name, updateUserSurName.value.surName,
      updateUserPhone.value.phone, updateUserCompanyName.value.companyName,
      updateUserPublicPhone.value.publicPhone, updateUserEmail.value.email,
      updateUserPassword.value.oldPassword, updateUserPassword.value.newPassword],
    ([name, surName, phone, companyName, publicPhone, email, oldPassword, newPassword]) => {
      if(name){
        updateUserNameErrors.value.nameError = false;
      }
      if(surName){
        updateUserSurNameErrors.value.surNameError = false;
      }
      if(phone){
        updateUserPhoneErrors.value.phoneError = false;
      }
      if(companyName){
        updateUserFormCompanyNameErrors.value.companyNameError = false;
      }
      if(publicPhone){
        updateUserFormPublicPhoneErrors.value.publicPhoneError = false;
      }
      if(email){
        updateUserEmailErrors.value.emailError = false;
      }
      if(oldPassword){
        updateUserPasswordErrors.value.oldPasswordError = false;
      }
      if(newPassword){
        updateUserPasswordErrors.value.newPasswordError = false;
      }
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
          <label>Name</label>
          <BaseInput v-model=updateUserName.name type="text" inputmode="numeric" placeholder="New Name"
              :error="updateUserNameErrors.nameError" variant="confidentialityData" required
              :error-message="updateUserNameErrors.nameError ? updateUserFormNameMessage.nameMessage : ''" />
          <div class="flex">
            <BaseButton @click.prevent="updateNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updateSurNameAccount" class="flex flex-col gap-3 w-full">
          <label>SurName</label>
          <BaseInput v-model=updateUserSurName.surName type="text" inputmode="numeric" placeholder="New SurName"
              :error="updateUserSurNameErrors.surNameError" variant="confidentialityData" required
              :error-message="updateUserSurNameErrors.surNameError ? updateUserFormSurNameMessage.surNameMessage : ''" />
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
            <BaseInput v-model=updateUserPassword.oldPassword :type="showOldPassword ? 'text' : 'password'" inputmode="numeric"
                :error="updateUserPasswordErrors.oldPasswordError" variant="confidentialityData" placeholder="Old Password"
                :error-message="updateUserPasswordErrors.oldPasswordError ? updateUserFormPasswordMessages.oldPasswordMessage : ''" />
            <img @click.prevent=toggleOldPassword :src="showOldPassword ? opened : closed" alt=""
                 :class="['absolute w-[30px] top-1/4 left-115', updateUserPasswordErrors.oldPasswordError ? 'top-1/6' : '']">
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <div class="relative">
            <BaseInput v-model=updateUserPassword.newPassword :type="showNewPassword ? 'text' : 'password'" inputmode="numeric"
                :error="updateUserPasswordErrors.newPasswordError" variant="confidentialityData" placeholder="New Password"
                :error-message="updateUserPasswordErrors.newPasswordError ? updateUserFormPasswordMessages.newPasswordMessage : ''"/>
            <img @click.prevent=toggleNewPassword :src="showNewPassword ? opened : closed" alt=""
                :class="['absolute w-[30px] top-1/4 left-115', updateUserPasswordErrors.newPasswordError ? 'top-1/8' : '']">
          </div>
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