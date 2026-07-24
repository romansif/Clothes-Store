<script setup lang="ts">
import { ref, watch } from 'vue'

import { usersStore } from "../../../composables/stores/users.store.ts";
import { userForms } from "../../../composables/forms-composables/forms/users.forms.ts";
import { useUpdateProfile } from "../../../../feature/profile/profile-composables/useUpdateProfile.ts";
import { userFormsErrors } from "../../../composables/forms-composables/forms-errors/users.errors.ts";

import opened from '../../../../app/assets/icons/auth/opened.png'
import closed from '../../../../app/assets/icons/auth/closed.png'
import BaseButton  from "../../button/BaseButton.vue";

const { user } = usersStore();
const {
  updatePasswordAccount,
  updateNameAccount, updateSurNameAccount,
  updatePhoneAccount, updateCompanyName,
  updatePublicPhoneAccount, updateEmailAccount,
} = useUpdateProfile();

const {
  updateUserFormPublicPhoneErrors,
  updateUserNameErrors, updateUserSurNameErrors,
  updateUserEmailErrors, updateUserPasswordErrors,
  updateUserPhoneErrors, updateUserFormCompanyNameErrors,
} = userFormsErrors();

const {
  updateUserName, updateUserFormNameMessage,
  updateUserPhone, updateUserFormPhoneMessage,
  updateUserEmail, updateUserFormEmailMessage,
  updateUserSurName, updateUserFormSurNameMessage,
  updateUserPassword, updateUserFormPasswordMessages,
  updateUserCompanyName, updateUserFormCompanyNameMessage,
  updateUserFormPublicPhone, updateUserFormPublicPhoneMessage,
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
  <div class="flex font-medium flex-col gap-8 pt-5">
    <div class="flex flex-col gap-4">
      <div class="flex gap-10">
        <form @keydown.enter.prevent="updateNameAccount" class="flex flex-col gap-3 w-full">
          <label for="">Name</label>
          <input v-model=updateUserName.name type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New Name" />
          <span v-if=updateUserNameErrors.nameError class="text-red-600 text-xs">
            {{ updateUserFormNameMessage.nameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updateSurNameAccount" class="flex flex-col gap-3 w-full">
          <label for="">SurName</label>
          <input v-model=updateUserSurName.surName type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New SurName" />
          <span v-if=updateUserSurNameErrors.surNameError class="text-red-600 text-xs">
            {{ updateUserFormSurNameMessage.surNameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateSurNameAccount()" name="Save SurName" variant="profileForm" />
          </div>
        </form>
      </div>
      <div @keydown.enter.prevent="updatePhoneAccount" v-if="user.role === 'Buyer'" class="flex flex-col gap-10 sm:flex-row">
        <form class="flex flex-col gap-3 w-full">
          <label for="">Phone</label>
          <input v-model=updateUserPhone.phone type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="+000 (00) 000-00-00" />
          <span v-if=updateUserPhoneErrors.phoneError class="text-red-600 text-xs">
            {{ updateUserFormPhoneMessage.phoneMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updatePhoneAccount()" name="Save Phone" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-full">
          <label for="">Email</label>
          <input v-model=updateUserEmail.email type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="example@mail.com" />
          <span v-if=updateUserEmailErrors.emailError class="text-red-600 text-xs">
            {{ updateUserFormEmailMessage.emailMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
          </div>
        </form>
      </div>
      <div v-if="user.role === 'Seller'" class="flex flex-col gap-10 sm:flex-row">
        <form @keydown.enter.prevent="updateCompanyName" class="flex flex-col gap-3 w-full">
          <label for="">Company Name</label>
          <input v-model=updateUserCompanyName.companyName type="text" inputmode="numeric" class="border border-gray-200
              rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New Company Name" />
          <span v-if=updateUserFormCompanyNameErrors.companyNameError class="text-red-600 text-xs">
            {{ updateUserFormCompanyNameMessage.companyNameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click.prevent="updateCompanyName()" name="Save Company Name" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updatePublicPhoneAccount" class="flex flex-col gap-3 w-full">
          <label for="">Public Phone</label>
          <input v-model=updateUserFormPublicPhone.publicPhone type="text" inputmode="numeric" class="border border-gray-200
              rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="+000 (00) 000-00-00" />
          <span v-if=updateUserFormPublicPhoneErrors.publicPhoneError class="text-red-600 text-xs">
            {{ updateUserFormPublicPhoneMessage.publicPhoneMessage }}</span>
          <div class="flex">
            <BaseButton @click.prevent="updatePublicPhoneAccount()" name="Save Phone" variant="profileForm" />
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-col">
      <form @keydown.enter.prevent="updatePasswordAccount" class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <div class="relative">
            <input v-model=updateUserPassword.oldPassword :type="showOldPassword ? 'text' : 'password'" inputmode="numeric"
                class="w-full border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none"
                placeholder="Old Password" />
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
                class="w-full border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none"
                placeholder="New Password" />
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
    <div v-if="user.role === 'Seller'" class="flex gap-10">
      <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-[510px]">
        <label for="">Email</label>
        <input v-model=updateUserEmail.email type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
            outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="example@mail.com" />
        <span v-if=updateUserEmailErrors.emailError class="text-red-600 text-xs">
          {{ updateUserFormEmailMessage.emailMessage }}
        </span>
        <div class="flex">
          <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>